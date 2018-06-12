const mongoose = require('mongoose');

const definitions = {
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
        max: 120,
        min: 1
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    contactInfo: {
        email: {
            type: String,
        },
        mobile: {
            type: String,
        },
        github: {
            type: String,
        }, 
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
    }
}

const options = {
    timestamps: true,
}

const friendScheme = new mongoose.Schema(definitions, options)
const friendModel = mongoose.model('Friend', friendScheme, 'Friends' )
module.exports = friendModel;