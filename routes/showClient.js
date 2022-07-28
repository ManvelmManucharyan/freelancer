const express = require('express');
const router = express.Router();
const Client = require('../db/client');
const Auth = require('../passportAuthentication/auth');

router.get('/', Auth.isAuthenticated, async (req, res)=>{
    const clients = await Client.find({});
    res.render('../view/showClient.ejs', {clients});
});

module.exports = router;