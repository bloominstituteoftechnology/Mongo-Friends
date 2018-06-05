const mongoose = require('mongoose');

const toLowerCase = email => email.toLowerCase();

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
    contactInfo: {
        email: {
                type: String,
                required: false,
                lowercase: true,
                trim: true,
                unique: true
        },
        mobile_number: {
                type: Number,
                required: false
        },
        github_username: {
                type: String,
                required: false,
                trim: true
        },
        facebook_username: {
                type: String,
                required: false,
                trim: true
        },
        twitter_handle: {
                type: String,
                required: false,
                trim: true
        },
        address: {
                type: String,
                required: false,
                trim: true
        }
    },
    createdOn: {
            type: Date,
            default: Date.now()
    }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;