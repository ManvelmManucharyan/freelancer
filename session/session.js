require('dotenv').config();
const express = require('Express');
const router = express.Router();
const session = require('express-session');

router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

module.exports = router;