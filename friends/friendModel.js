const mongoose = require('mongoose');

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
        min: 1, 
        max: 120,   //must number between 1 - 120
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    contactInfo: {
        email: [String],
        gitHubUserName: String,
        facebook: [String]
    }
});

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;