const mongoose = require('mongoose');

function validator(val) {
    return val;
}

var exists = [validator, "Please provide the name, last name, and age for the homie."]

const definition = {
    firstName: {
        type: String,
        required: [true, "Please provide the name, last name, and age for the homie."],
        validate: exists
    },
    lastName: {
        type: String,
        required: [true, "Please provide the name, last name, and age for the homie."],
        validate: exists

    },
    age: {
        type: Number,
        required: [true, "Please provide the name, last name, and age for the homie."],
        min: [1, 'Your friend is too young for you, age must be between 1 and 120'],
        max: [120, 'Your friend is too old for you, age must be between 1 and 120'],        
        validate: exists

    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
}

const options = {
    timestamps: true
};

const friendSchema = new mongoose.Schema( definition, options);
const friendModel = mongoose.model( 'Friend', friendSchema, 'friends');

module.exports = friendModel;