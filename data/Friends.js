const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const options = {
    timestamps: true
};

const Friends = new Schema({
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
        max: 120,
        required: true
    },
    contactInfo: {
        email: {
            type: String
        },
        mobileNumber: {
            type: Number
        },
        githubUserName: {
            type: String
        },
        facebookUserName: {
            type: String
        },
        twitterHandle: {
            type: String
        },
        required: false
    }
}, options);

module.exports = mongoose.model('friends', Friends);