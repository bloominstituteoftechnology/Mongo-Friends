const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    friends: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: 1-20
    },
    createdOn: {
        type: Date, 
        default: Date.now,
    },
});

const friendModel = mongoose.model('Friend', friendSchema); 

module.exports = friendModel;