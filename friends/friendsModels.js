const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
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
        required: true,
        default: Date.now()
    }
});


const FriendsModel = mongoose.model('Friends', FriendsSchema);

module.exports = FriendsModel;