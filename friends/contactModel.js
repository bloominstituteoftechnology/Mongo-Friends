const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    
        email: {
            type: String,
            required: false,
        },
        mobileNumber: {
            type: Number,
            required: false
        },
        githubUser: {
            type: Number,
            required: false
        },
        facebookUser: {
            type: Number,
            required: false
        },
        twitterUser: {
            type: Number,
            required: false
        }
    
})
module.exports = ContactSchema;