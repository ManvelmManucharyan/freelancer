require('dotenv').config();
const express = require('Express');
const mongoose = require('mongoose');
const registerRout = require('./routes/register');
const loginRout = require('./routes/login');
const homeRout = require('./routes/home');
const clientRout = require('./routes/client-creation');
const showClientRout = require('./routes/client-all');
const passport = require('./passportAuthentication/passport');
const session = require('./session/session');
const methodOverride = require('method-override');
const invoiceRout = require('./routes/invoice');
const deleteRout = require('./routes/client-delete');
const Mail = require('./routes/mail');
const Client = require('./model/client');
const User = require('./model/users');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=> console.log('Connected to databse'));

setInterval(async ()=>{
    const clients = await Client.find({});
    clients.forEach(async (client) => {
        const user = await User.findById(client.user.toString());
        if (Math.ceil(Math.abs(client.paymentDate - new Date())/(1000*60*60*24)) <= 5 && client.paymentDate > new Date()) {
            Mail.reminder(client, user);
        } else if (client.paymentDate <= new Date()){
            Mail.overdue(client,user,`invoices/${client.name}_invoice_${client._id}.pdf`);
        }
    });
}, (1000*60*60*24));

const app = express();

app.set('view engine', 'ejs');
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport);
app.use(methodOverride('_method'));
app.use('/register', registerRout);
app.use('/login', loginRout);
app.use('/', homeRout);
app.use('/client', clientRout);
app.use('/showClients', showClientRout);
app.use('/invoice', invoiceRout);
app.use('/deleteClient', deleteRout);

app.listen(process.env.PORT);