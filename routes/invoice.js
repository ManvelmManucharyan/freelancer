require('dotenv').config();
const express = require('express');
const router = express.Router();
const Client = require('../db/client');
const Invoice = require('../routes/createInvoice');
const Mail = require('../routes/mail');

router.get('/', async (req, res)=>{
    res.render('../view/invoice.ejs');
});

router.post('/', async (req, res)=>{
    const client = await Client.findById(req.body.createTask);
    await Invoice.invoce(client, req.body.price);
    Mail.main(client, `invoices/${client.name}_invoice_${client._id}.pdf`);
    res.redirect('/showClients');
});

module.exports = router;