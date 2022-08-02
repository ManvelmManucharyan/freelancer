const express = require('express');
const router = express.Router();
const Client = require('../model/client');
const Auth = require('../passportAuthentication/auth');

router.get('/:id',Auth.isAuthenticated, async (req, res)=>{
    const client = await Client.findById(req.params.id);
    res.render('../view/client-delete.ejs', {client});
});

router.delete('/:id', async (req, res)=>{
    try {
        const client = await Client.findById(req.params.id);
        await client.remove();
        res.redirect('/');      
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;