const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Integer,
        min: 1,
        max: 120,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
})

const FriendModel = mongoose.Model('Friend', FriendSchema);

module.exports = FriendModel;
