// import mongoose
const mongoose = require('mongoose');

// create definition
const definition = {
    firstName: {
        type: String,
        required: true,
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
        default: Date.now
    },
};
// add timestamps
const friendOptions = {
    timestamps: true
};

//create schemas and model
const friendSchema = new mongoose.Schema(definition, friendOptions);
const friendModel = mongoose.model('Friend', friendSchema, 'friends');

//export 
modules.exports = friendModel;

