require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const Client = require('../db/client');
class Mail{
    static async main(client, filePath) {
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
                path: path.join(path.resolve(),`${filePath}` ),
                contentType: 'application/pdf'
                }],
        });
        }
    static async reminder (){
        const clients = await Client.find({});
        clients.forEach(async (client) => {
            if(new Date().getDay() - client.paymentDate.getDay() <= 2){
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
                    subject: "Invoice Reminder",
                    text: `Dear ${client.name} ${client.surname}, we want to remind you that you have payment in ${client.paymentDate.toISOString().split('T')[0].split('-').reverse().join('/')}`
                });            
            }
        });
    }
}

module.exports = Mail;