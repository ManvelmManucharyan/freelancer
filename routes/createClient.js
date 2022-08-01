const express = require('express');
const router = express.Router();
const Client = require('../model/client');
const Auth = require('../passportAuthentication/auth');
const User= require('../model/users');

router.get('/', Auth.isAuthenticated,(req, res)=>{
    res.render('../view/clientInfo.ejs');
});

router.post('/', async (req, res)=>{
    const user = await User.findById(req.session.passport.user);
    const client = new Client({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        serviceType: req.body.serviceType,
        paymentDate: req.body.paymentDate,
        user: user
    });
    try {
        await client.save();
        res.redirect('/');
    } catch (error) {
       console.error(error); 
    }
});

module.exports = router;