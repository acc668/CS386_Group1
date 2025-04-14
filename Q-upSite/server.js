const express = require('express');

//User Login requirements vvv
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//database requirements
const mysql = require('mysql2');


const app = express();
const PORT = 3000;


//MySQL Connection -------------------------------------------------------------
//NOTE: THE CURRENT INFORMATION IS FOR A *LOCAL* DB
//      --> This is ONLY going to be used for DEVELOPMENT
//      --> CHANGE necessary info when CLOUD HOSTING software
//          is selected
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // <-- TEMPORARY
    password: 'password',  // <-- TEMPORARY
    database: 'QUp'  // <-- TEMPORARY
})

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log("Successful MySQL Connection!");
});
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//Database interaction functions
function addReservation(date, time, user) {
    connection.execute(
        'INSERT INTO reservations, '
    )
}


// Defining Local Strategy For Authentication-----------------------------------

passport.use(new LocalStrategy(async (username, password, done) => {
    //checking that the user exists

    try {
        //QUERYING DATABASE
       const [results] = await connection.execute(
        'SELECT id, username, password FROM users WHERE username = ?',
        [username]
       )
       
        if(results.length == 0) {
            return done(null, false, {message: "User not found"});
        }
       
        //extract the actual row (id, username, and password) from the resutls
        //array
        user = results[0]

        //checking if the passwords match
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            //handling invalid password case
            return done(null, false, {message: "Invalid Password"})
        }
        //handling valid password case
        return done(null, user)
    }
    catch(err) {
        return done(err)
    }
    
}))

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//Serializing User
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Deserializing User
passport.deserializeUser((id, done) => {

    try {
        //querying database for user
        const results = connection.execute(
            'SELECT id, username FROM users WHERE id = ?',
            [id]
        );

        //no user found
        if(results.length === 0) {
            return done(null, false)
        }

        //if user found, returning the user object
        return done(null, results[0]);
    }
    catch(err) {
        done(err)
    }

})

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));


//specifying middleware for session management
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session());

//Authentication middleware
app.use(express.urlencoded({ extended: false }));

//Custom authentication middleware
function isAuth(req, res, next) {
    //Make sure the user session is valid
    if (req.isAuthenticated ()) {
        return next();
    }

    //if not valid session
    res.redirect('/login');   //REPLACE WITH POPUP!!
}



//async functions
async function registerUser(username, password) {
    try {
        const saltRounds = 10
        const  hashedPassword = await bcrypt.hash(password, saltRounds);

        await connection.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]);
        
        console.log('User Registered Successfully')
    }
    catch(err) {
        console.error("Error registering user: ", err)
    }
}



//routes------------------------------------------------------------------------

// //login routes      REFERENCE ROUTES!!
// app.get("login", (req, res) => {
//     //serves the login page

//     //THIS MIGHT BE DIFFERENT DUE TO UTLIZATION OF POPUP
// } )

// app.post("/login", express.urlencoded({extended: false}), (req, res, next) => {
//     //authenticate the log in attempt
//     passport.authenticate('local', {
//         successRedirect: '/reserve',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res, next);
// })

// //TODO: Make LOGOUT route

// //TODO: reservation routes
// app.get("/reserve", (req, res) => {
//     //serve the "Make a Reservation" page, only if the user is logged in

//     passport.authenticate('local', {
//         successRedirect: '/reserve',
//         failureRedirect: '/login',
//         failureFlash: true
//     })

// })

// app.post("/reserve", express.urlencoded({extended: false}), (req, res, next) =>{
//     //save the new reservation request in the database
// })

// //temporary register endpoint for testing of user account creation
// app.post('/register', async (req, res) => {
//     const {username, password} = req.body
//     await registerUser(username, password);
//     res.send("User Registered!")
// })

//ACTUAL routes

// --> Reservations
    //POST request for authentication of the user and for adding a new reservation
app.post("/availability-schedule", express.urlencoded({extended: false}), isAuth, async (req, res, next) => {

    const user = req.user
    try {
        //querying database for user
        await connection.execute(
            'INSERT INTO reservations (id, date, start, end) VALUES (?, ?, ?, ?)',
            [user.id, user.body.date, user.body.startTime, user.body.endTime]
        );

    }
    catch(err) {
        console.error("Reservation Error: ", err)
        res.status(500).send("Error creating Reservation")
    }
})


// --> Account creation
    //POST request for making a new user
app.post("/New_Account", express.urlenconded({extended: false}), async (req, res, next)=>{
    
    const user = req.body.username
    const password = req.body.password

    
    registerUser(username, password)
})

    //GET request for accessing a user to make sure they don't already exist
    //before account creation
app.get("/New_Account", (req, res, next)=>{
    try {
        //querying database for user
        const results = connection.execute(
            'SELECT id, username FROM users WHERE username = ?',
            [req.username]
        );

        //no user found
        if(results.length === 0) {
            return done(null, false)
        }

        //if user found, returning the user object
        return done(null, results[0]);
    }
    catch(err) {
        done(err)
    }
})


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
