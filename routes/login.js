const express = require('express');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');
const passport = require('passport');

router.get('/', Auth.isNotAuthenticated, (req, res)=>{
    res.render('../view/login.ejs');
});

router.post('/',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login'
}));

module.exports = router;