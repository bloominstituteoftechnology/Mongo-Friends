const mongoose = require('mongoose');

 const user = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    birthday: String,
    date: { 
        type: Date, 
        default: Date.now 
    }
 });

 module.exports = mongoose.model('User', user);