const mongoose = require('mongoose');
const ContactSchema = require('./contactModel');


const FriendSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        unique: true 
    },
    lastName: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    contactInfo: ContactSchema
});
const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;