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
            type: String,
            required: false
        },
        facebookUser: {
            type: String,
            required: false
        },
        twitterUser: {
            type: String,
            required: false
        }
    
})
const contactModel = mongoose.model('Contact', ContactSchema);
module.exports = contactModel;