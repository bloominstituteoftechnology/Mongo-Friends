const mongoose = require('mongoose');



const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    age: {
        type: Number,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;