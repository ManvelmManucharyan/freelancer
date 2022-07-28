require('dotenv').config();
const express = require('Express');
const mongoose = require('mongoose');
const registerRout = require('./routes/register');
const loginRout = require('./routes/login');
const homeRout = require('./routes/home');
const clientRout = require('./routes/client');
const showClientRout = require('./routes/showClient');
const passport = require('./passportAuthentication/passport');
const session = require('./session/session');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=> console.log("Connected to databse"));

const app = express();

app.set('view engine', 'ejs');


app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport);
app.use('/register', registerRout);
app.use('/login', loginRout);
app.use('/', homeRout);
app.use('/client', clientRout);
app.use('/showClients', showClientRout);

app.listen(process.env.PORT);