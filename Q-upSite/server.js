const express = require('express');

// User Login requirements
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Database requirements
const mysql = require('mysql2/promise'); // Using promise-based API for better async handling

// Create Express app
const app = express();
const PORT = 3000;

// Database connection
let connection;

/**
 * Initialize database connection
 * @returns {Promise} - Resolves when connection is established
 */
async function initializeDatabase() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'testuser',  // <-- TEMPORARY
            password: 'testpassword',  // <-- TEMPORARY
            database: 'QUp'  // <-- TEMPORARY
        });
        
        console.log("Successful MySQL Connection!");
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL: ', err);
        throw err;
    }
}

/**
 * Add a reservation to the database
 * @param {string} date - The date of the reservation
 * @param {string} startTime - The start time
 * @param {string} endTime - The end time
 * @param {Object} user - The user making the reservation
 * @returns {Promise} - Resolves with the result of the database operation
 */
async function addReservation(date, startTime, endTime, user) {
    try {
        const result = await connection.execute(
            'INSERT INTO reservations (id, date, start, end) VALUES (?, ?, ?, ?)',
            [user.id, date, startTime, endTime]
        );
        return result;
    } catch (err) {
        console.error("Error adding reservation: ", err);
        throw err;
    }
}

/**
 * Register a new user
 * @param {string} username - The username
 * @param {string} password - The password (will be hashed)
 * @returns {Promise} - Resolves when user is registered
 */
async function registerUser(username, password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await connection.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        
        console.log('User Registered Successfully');
        return { success: true };
    }
    catch(err) {
        console.error("Error registering user: ", err);
        throw err;
    }
}

/**
 * Check if a username already exists
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} - Resolves with true if user exists
 */
async function userExists(username) {
    try {
        const [results] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );
        
        return results.length > 0;
    } catch (err) {
        console.error("Error checking if user exists: ", err);
        throw err;
    }
}

// Authentication setup
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Query database
        const [results] = await connection.execute(
            'SELECT id, username, password FROM users WHERE username = ?',
            [username]
        );
        
        if(results.length === 0) {
            return done(null, false, { message: "User not found" });
        }
        
        // Extract user data
        const user = results[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return done(null, false, { message: "Invalid Password" });
        }
        
        return done(null, user);
    }
    catch(err) {
        return done(err);
    }
}));

// Serializing/Deserializing User
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        // Query database for user
        const [results] = await connection.execute(
            'SELECT id, username FROM users WHERE id = ?',
            [id]
        );

        if(results.length === 0) {
            return done(null, false);
        }

        return done(null, results[0]);
    }
    catch(err) {
        done(err);
    }
});

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
    secret: 'secretkey', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Authentication middleware
 */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// API Routes

/**
 * Route to create a new reservation
 * Requires authentication
 */
app.post("/availability-schedule", isAuth, async (req, res) => {
    const user = req.user;
    try {
        await addReservation(
            req.body.date,
            req.body.startTime,
            req.body.endTime,
            user
        );
        res.status(201).json({ success: true });
    }
    catch(err) {
        console.error("Reservation Error: ", err);
        res.status(500).send("Error creating Reservation");
    }
});

/**
 * Route to create a new user account
 */
app.post("/New_Account", express.urlencoded({ extended: false }), async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const exists = await userExists(username);
        if (exists) {
            return res.status(409).json({ 
                success: false, 
                message: "Username already exists" 
            });
        }
        
        // Register the new user
        await registerUser(username, password);
        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Account creation error: ", err);
        res.status(500).json({ 
            success: false, 
            message: "Error creating account" 
        });
    }
});

/**
 * Route to check if a username exists
 */
app.get("/check-username/:username", async (req, res) => {
    try {
        const exists = await userExists(req.params.username);
        res.json({ exists });
    } catch (err) {
        console.error("Username check error: ", err);
        res.status(500).json({ 
            success: false, 
            message: "Error checking username" 
        });
    }
});

/**
 * Login route
 */
app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: info.message || "Authentication failed" 
            });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ success: true });
        });
    })(req, res, next);
});

/**
 * Logout route
 */
app.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: "Error logging out" 
            });
        }
        res.json({ success: true });
    });
});

// Server initialization
let server;

/**
 * Start the server
 * @returns {Promise} - Resolves when server is started
 */
async function startServer() {
    try {
        await initializeDatabase();
        
        server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        
        return server;
    } catch (err) {
        console.error("Failed to start server: ", err);
        throw err;
    }
}

/**
 * Stop the server
 * @returns {Promise} - Resolves when server is stopped
 */
async function stopServer() {
    if (server) {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    }
    
    if (connection) {
        await connection.end();
    }
}

// Start the server if this file is run directly
if (require.main === module) {
    startServer().catch(err => {
        console.error("Server failed to start: ", err);
        process.exit(1);
    });
}

// Export for testing
module.exports = {
    app,
    server,
    startServer,
    stopServer,
    initializeDatabase,
    addReservation,
    registerUser,
    userExists,
    isAuth
};

module.exports = app, registerUser;