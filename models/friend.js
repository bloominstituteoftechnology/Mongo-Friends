const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        unique: true
    },

    lastName: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true,
        min: [1, 'Not old enough to be a friend'],
        max: [120, 'Too old to be a friend']
    },

    createOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;