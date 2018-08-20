const mongoose = require('mongoose');

const ContactInfo = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    githubUsername: {
        type: String,
        required: true
    },
    facebookUsername: {
        type: String,
        required: true
    },
    twitterHandle: {
        type: String,
        required: true
    }
});

const definition = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
    },
    contactInfo: [ContactInfo],
    createdOn: {
        type: Date,
        default: Date.now,
    }
}

const options = {
    timestamp: true,
}


const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;