const express = require('express');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');


router.get('/', Auth.isAuthenticated, (req, res)=>{
    try {
        res.render('../view/index.ejs');
    } catch (error) {
        console.error(error);
    }
});

router.get('/logout', function (req, res, next) {
    req.logOut(function(err){
        if(err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;