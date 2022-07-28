require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../db/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(passport.initialize());
router.use(passport.session());
passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
    const user = await User.findOne({email});
    const token =  jwt.sign({
        id: user.id,
        name: user.name,
    },
    process.env.JWT_SECRET
    );

    try {
        if(user === undefined) {
            return done(null, null, {message: 'Incorrect login or password'});
        }else if(user !== null && await bcrypt.compare(password, user.password)) {
            return done(null, user, {token});
        }
    
        done(null, null, {message: "Incorrect login or password"});
    } catch (error) {
        console.log(error);
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    done(null, User.findOne({id}));
});


module.exports = router;