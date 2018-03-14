const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide firstName, lastName and age for the friend.']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide firstName, lastName and age for the friend.']
    },
    age: {
        type: Number,
        min: [1, 'Age must be a whole number between 1 and 120.'],
        max: [120, 'Age must be a whole number between 1 and 120.'],
    },
    createdOn: {
        type: String,
        required: true,
        default: new Date(),
    }
});


module.exports = mongoose.model('Friend', FriendSchema);