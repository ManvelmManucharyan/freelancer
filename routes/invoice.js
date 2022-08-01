const express = require('express');
const router = express.Router();
const Client = require('../model/client');
const Invoice = require('../utils/create-invoice');
const Mail = require('../routes/mail');
const User = require('../model/users');

router.get('/', async (req, res)=>{
    res.render('../view/invoice.ejs');
});

router.post('/', async (req, res)=>{
    const user = await User.findById(req.session.passport.user);
    const clients = await Client.findById(req.body.createTask);
    await Invoice.invoce(clients, req.body.price, user);
    Mail.main(clients,user, `invoices/${clients.name}_invoice_${clients._id}.pdf`);
    res.redirect('/showClients');
});

module.exports = router;