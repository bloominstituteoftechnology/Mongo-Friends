const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
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
        max: 120,
        min: 1,
        required: true,

    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    }

});

const friendModel = mongoose.model('Friend', friendSchema);
module.exports = friendModel;