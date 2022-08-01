const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../model/users');
const bcrypt = require('bcrypt');
const Token = require('./jwt/jwt');

router.use(passport.initialize());
router.use(passport.session());
passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
    const user = await User.findOne({email});
    try {
        if(user === undefined) {
            return done(null, false, {message: 'Incorrect login or password'});
        }else if(user !== null && await bcrypt.compare(password, user.password)) {
            Token.createToken(user);
            return done(null, user);
        }
        done(null, false, {message: 'Incorrect login or password'});
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