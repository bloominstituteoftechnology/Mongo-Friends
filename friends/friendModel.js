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
        required: true,
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    contactInfo: {
        email: {
            type: String,
            required: false
        },
        mobileNumber: {
            type: Number,
            required: false
        },
        twitterHandle: {
            type: String,
            required: false
        }
    }
})

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;