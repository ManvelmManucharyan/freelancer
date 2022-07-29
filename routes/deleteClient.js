const express = require('express');
const router = express.Router();
const easyinvoice = require('easyinvoice');
const Client = require('../db/client');

router.get('/', (req, res)=>{
    res.render('../view/deleteClient.ejs');
});

router.post('/', async (req, res)=>{
    const client = await Client.findById(req.body.finish);
    await client.remove();
    res.render('../view/home');
});

module.exports = router;