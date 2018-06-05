const mongoose = require('mongoose');
const ContactSchema = require('./contactModel')

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    contactInfo: ContactSchema
})

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel