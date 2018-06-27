const mongoose = require('mongoose');

const definition = {
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
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    contactInfo: {
        email: {
            type: String
        },
        phoneNumber: {
            type: Number
        }
    }
}

const options = {
    timestamp: true
}

const friendSchema = new mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'Friends');

module.exports = friendModel;