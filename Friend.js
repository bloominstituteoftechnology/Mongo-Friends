const mongoose = require('mongoose');

const definition = {
    firstName: {
        type: String,
        maxlength: [20, 'Your name is too long'], //DOESNT WORK :(
        required: true
    },
    lastName: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        max: [120, 'No one lives that long! Try a younger age'],
        min: [1, 'An age younger than 1 is impossible!'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
}

// I DONT UNDERSTAND WHAT'S GOING ON BELOW
const options = {
    timestamp: true
}

const friendSchema = new mongoose.Schema(definition, options); //What are these args?
const Friend = mongoose.model('Friend', friendSchema, 'friends'); // and these?

module.exports = Friend;