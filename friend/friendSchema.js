const mongoose = require('mongoose');
const friendScheme = mongoose.Schema;

const definitions = {
    firstName = {
        type: String,
        required: true,
    },
    lastName = {
        type: String,
        required: true,
    },
    // should be between 1-20
    age = {
        type: Number,
        required: true,
    },
    createdOn = {
        type: Date,
        required: true,
        default: Date.now
    }
}

const options = {
    timestamps: true,
}

const friendScheme = new mongoose.Schema(definitions, options)
const friendModel = mongoose.model('friend', friendScheme, 'friends' )
module.exports = friendModel;