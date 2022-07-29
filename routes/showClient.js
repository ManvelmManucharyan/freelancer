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
        client.task = 'Ongoing';
        await client.save();
        res.redirect('/invoice');
    }else if(req.body.finish){
        const client = await Client.findById(req.body.finish);
        client.task = 'finish';
        await client.remove();
        res.redirect('/deleteClient');
    }

});


module.exports = router;