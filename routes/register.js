const express = require('express');
const User = require('../model/users');
const router = express.Router();
const Auth = require('../passportAuthentication/auth');
const bcrypt = require('bcrypt');

router.get('/', Auth.isNotAuthenticated, async (req, res)=>{
    res.render('../view/register.ejs');
});

router.post('/', async (req, res)=>{
    const {name, surname, email, password, paymentType} = req.body;
    if (await User.findOne({email})) {
        res.render('../view/register.ejs', {errorMessage: 'This Email Already Exist'});
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            surname,
            email,
            password: hashPassword,
            paymentType
        });
        try {
            await user.save();
            res.redirect('/login');
        } catch (error) {
            console.error(error);
        }
    }
});

module.exports = router;