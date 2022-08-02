const express = require('express');
const router = express.Router();
const Client = require('../model/client');
const Auth = require('../passportAuthentication/auth');
const User= require('../model/users');

router.get('/', Auth.isAuthenticated, async (req, res)=>{
    const user = await User.findById(req.session.passport.user);
    const clients = await Client.find({user});
    res.render('../view/showClient.ejs', {clients});
});

router.post('/', Auth.isAuthenticated, async (req, res)=>{
    try {
        if (req.body.task) {
            const clients = await Client.findById(req.body.task);
            res.redirect(`/invoice/${clients._id}`);
        }else if (req.body.finish) {
            const clients = await Client.findById(req.body.finish);
            res.redirect(`/deleteClient/${clients._id}`);
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;