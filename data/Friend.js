const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const options = {
    timestamps: true
};

const Friends = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, options);

module.exports = mongoose.model('friends', Friends);