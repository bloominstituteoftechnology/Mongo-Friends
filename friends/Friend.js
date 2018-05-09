const mongoose = require('mongoose');

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
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
};

const options = {
    timestamps: true,
    strict: false
};

const friendSchema = new mongoose.Schema(definition, options);

const Friend = mongoose.model('Friend', friendSchema, 'friends');

module.exports = Friend;