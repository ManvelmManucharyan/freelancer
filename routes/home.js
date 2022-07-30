const express = require('express');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');
const User = require('../db/users')



router.get('/', Auth.isAuthenticated, async (req, res)=>{
    try {
        const user = await User.find({token:{$exists:true}});
        res.render('../view/index.ejs', {user});
    } catch (error) {
        console.error(error);
    }
});

router.get('/logout', async (req, res, next)=> {
    req.logOut(async (err)=> {
        if(err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;