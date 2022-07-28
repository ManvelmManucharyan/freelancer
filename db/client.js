const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
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
    serviceType: {
        type: String,
        requried:  true
    },
    paymentDate: {
        type: Date,
        requried:  true
    }
});

module.exports = mongoose.model('Clients', clientsSchema);