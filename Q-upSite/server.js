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
    password: 'Narvaez#042719',  // <-- TEMPORARY
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
passport.deserializeUser((user, done) => {
    done(null, {id:1, username:'admin'});
})

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));


//specifying middleware for session management
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session());

//Authentication middleware
app.use(express.urlencoded({ extended: false }));


//async functions
async function registerUser(username, password) {
    try {
        const  hashedPassword = await bcrypt.hash(password, 10);

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

//login route      
app.post("/login", express.urlencoded({extended: false}), (req, res, next) => {
    //authenticate the log in attempt
    passport.authenticate('local', {
        successRedirect: '/reserve',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})

//temporary register endpoint for testing of user account creation
app.post('/register', async (req, res) => {
    const {username, password} = req.body
    await registerUser(username, password);
    res.send("User Registered!")
})

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
