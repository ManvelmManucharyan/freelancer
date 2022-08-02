const express = require('express');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');
const User = require('../model/users');
const jwt = require('jsonwebtoken');

router.get('/',Auth.isAuthenticated, async (req, res)=>{
    try {        
        const user = await User.findById(req.session.passport.user);
        jwt.verify(user.token, process.env.JWT_SECRET, (err)=>{
            if (err) {
                res.render('../view/login.ejs');
            }else {
                res.render('../view/index.ejs', {user});
            }
        });
     } catch (error) {
        console.error(error);
    }
});

router.get('/logout', async (req, res, next)=> {
    req.logOut(async (err)=> {
        if (err) return next(err);
        res.redirect('/login');
    });
}); 

module.exports = router;