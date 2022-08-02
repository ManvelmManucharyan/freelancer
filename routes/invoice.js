const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Client = require('../model/client');
const Invoice = require('../utils/create-invoice');
const Mail = require('../routes/mail');
const User = require('../model/users');
const Auth = require('../passportAuthentication/auth');

router.get('/:id',Auth.isAuthenticated ,async (req, res)=>{
    const clients = await Client.findById(req.params.id);
    if (fs.existsSync(path.join(path.resolve(),`invoices/${clients.name}_invoice_${clients._id}.pdf`))) { 
        res.render('../view/invoice.ejs', {clients,exist: 'yes'});   
    } else {
        res.render(`../view/invoice.ejs`, {clients});
    }
});

router.post('/:id', async (req, res)=>{
    try {
        const clients = await Client.findById(req.params.id);
        const user = await User.findById(clients.user._id);
        await Invoice.invoce(clients, req.body.price, user);
        Mail.main(clients,user, `invoices/${clients.name}_invoice_${clients._id}.pdf`);
        res.redirect('/showClients');   
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;