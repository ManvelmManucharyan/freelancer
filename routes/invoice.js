require('dotenv').config();
const express = require('express');
const router = express.Router();
const easyinvoice = require('easyinvoice');
const path = require('path');
const fs = require('fs');
const Client = require('../db/client');
const nodemailer = require('nodemailer');

router.get('/', async (req, res)=>{
    const client = await Client.findOne({task: 'Ongoing'});
    res.render('../view/invoice.ejs', {client});
});

router.post('/', async (req, res)=>{
    const client = await Client.findOne({task: 'Ongoing'});

    const data = {
        "customize": {
        },
        "sender": {
            "company": "Manucharyan Manvel",
            "address": "N. Stepanyan",
            "zip": "0062",
            "city": "Yerevan",
            "country": "Armenia"
    
        },
        "client": {
            "company": `Name Surname: ${client.name} ${client.surname}`,
            "address": `Email: ${client.email}`,
            "zip": ' ',
            "city": " ",
            "country": " "
        },
        "information": {
            "number": `2022${new Date().toISOString().split('T')[1].slice(4, 19)}`,
            "date": new Date().toISOString().split('T')[0],
            "due-date": req.body.paymentDate
        },
        "products": [
            {
                "quantity": 1,
                "description": `${client.serviceType}`,
                "tax-rate": 1,
                "price": req.body.price
            }
        ],
    
        "bottom-notice": "Kindly pay your invoice within 15 days.",
        "settings": {
            "currency": "USD"
        }
    };
    easyinvoice.createInvoice(data, async function (result) {
        await fs.writeFileSync(`invoices/${client.name}_invoice_${client._id}.pdf`, result.pdf, 'base64');
    });

    async function main() {
    let transporter = nodemailer.createTransport({
        host: "smtp.list.ru",
        post: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        },
    });

    let info = await transporter.sendMail({
        from: '"Manvel Manucharyan" <testnodemailer@list.ru>',
        to: `${client.email}`,
        subject: "Invoice",
        text: `Payment invoice, Dear ${client.name} ${client.surname}, make payment in time.`,
        attachments: [{
            filename: 'file.pdf',
            path: path.join(path.resolve(),`invoices/${client.name}_invoice_${client._id}.pdf` ),
            contentType: 'application/pdf'
          }],
    });
    console.log(path.resolve());
    }

    main().catch(console.error)
    res.redirect('/showClients');
});

module.exports = router;