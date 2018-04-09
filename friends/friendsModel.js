const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
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
        min: 1,
        max: 120,
    },
    createdOn: {
        type: Date,        
        required: true,
        default: Date.now,
    }
})

const friendsModel = mongoose.model('Friends', friendsSchema); //creates friends collection

module.exports = friendsModel;