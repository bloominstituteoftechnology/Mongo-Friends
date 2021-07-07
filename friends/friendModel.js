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
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    contactInfo: {
        type: Object,
        required: false,
    }
});

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;