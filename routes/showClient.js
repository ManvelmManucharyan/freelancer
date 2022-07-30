const express = require('express');
const router = express.Router();
const Client = require('../db/client');
const Auth = require('../passportAuthentication/auth');

router.get('/', Auth.isAuthenticated, async (req, res)=>{
    const clients = await Client.find({});
    res.render('../view/showClient.ejs', {clients});
});

router.post('/', Auth.isAuthenticated, async (req, res)=>{
    if(req.body.task){
        const client = await Client.findById(req.body.task);
        res.render('../view/invoice.ejs', {client});
    }else if(req.body.finish){
        const client = await Client.findById(req.body.finish);
        await client.remove();
        res.redirect('/deleteClient');
    }
});


module.exports = router;