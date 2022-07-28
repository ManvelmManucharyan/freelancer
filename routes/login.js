const express = require('express');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');
const passport = require('passport');

router.get('/', Auth.isNotAuthenticated, (req, res)=>{
    try {
        res.render('../view/login.ejs');
    } catch (error) {
        console.error(error);
    }
});

router.post('/', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;