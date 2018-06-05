const mongoose = require('mongoose'); 

const ContactSchema = new mongoose.Schema({
    email: {
        type: String
    },
    phone: {
        type: String
    },
    github: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    }
})

module.exports = ContactSchema