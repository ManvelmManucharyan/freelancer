const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        requried:  true
    },
    surname: {
        type: String,
        requried:  true
    },
    email: {
        type: String,
        requried:  true
    },
    password: {
        type: String,
        requried:  true
    },
    paymentType: {
        type: String,
        requried:  true
    }
});

module.exports = mongoose.model('Users', usersSchema);