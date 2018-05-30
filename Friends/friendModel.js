const mongoose = require('mongoose');

// schema design

const friendDefinition = {
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

const friendSchema = new mongoose.Schema(friendDefinition);

const friendModel = mongoose.model('Friend', friendDefinition, 'friends');

module.exports = friendModel;
