const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');

class CreateInvoice {
    static async invoce(client, price, user){
        const data = {
            'customize': {
            },
            'sender': {
                'company': `${user.name} ${user.surname}`,
                'address': 'N. Stepanyan',
                'zip': '0062',
                'city': 'Yerevan',
                'country': 'Armenia'
            },
            'client': {
                'company': `Name Surname: ${client.name} ${client.surname}`,
                'address': `Email: ${client.email}`,
                'zip': ' ',
                'city': ' ',
                'country': ' '
            },
            'information': {
                'number': `2022${new Date().toISOString().split('T')[1].slice(4, 19)}`,
                'date': new Date().toISOString().split('T')[0].split('-').reverse().join('/'),
                'due-date': `${client.paymentDate.toISOString().split('T')[0].split('-').reverse().join('/')}`
            },
            'products': [
                {
                    'quantity': 1,
                    'description': `${client.serviceType}`,
                    'tax-rate': 1,
                    'price': price
                }
            ],
            'bottom-notice': 'Kindly pay your invoice within 15 days.',
            'settings': {
                'currency': 'USD'
            }
        };
        await easyinvoice.createInvoice(data, (result)=>{
            fs.writeFileSync(path.join(path.resolve(),`invoices/${client.name}_invoice_${client._id}.pdf`), result.pdf, 'base64');
        });
    }
}

module.exports = CreateInvoice;