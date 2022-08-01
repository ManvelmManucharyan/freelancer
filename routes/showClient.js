const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Client = require('../model/client');
const Auth = require('../passportAuthentication/auth');
const User= require('../model/users');

router.get('/', Auth.isAuthenticated, async (req, res)=>{
    const user = await User.findById(req.session.passport.user);
    const clients = await Client.find({user});
    res.render('../view/showClient.ejs', {clients});
});

router.post('/', Auth.isAuthenticated, async (req, res)=>{
    if(req.body.task){
        const clients = await Client.findById(req.body.task);
        if(fs.existsSync(path.join(path.resolve(),`invoices/${clients.name}_invoice_${clients._id}.pdf`))){ 
            res.render('../view/invoice.ejs', {clients,exist: 'yes'});   
        } else {
            res.render('../view/invoice.ejs', {clients});
        }
    }else if(req.body.finish){
        const client = await Client.findById(req.body.finish);
        await client.remove();
        res.redirect('/deleteClient');
    }
});


module.exports = router;