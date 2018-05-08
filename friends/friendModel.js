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
        integer: 1-120,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
};

const options = {
    timestamps: true,
};

const friendSchema = new mongoose.Schema(definition, options);

module.exports = friendModel;