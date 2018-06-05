const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        unique: true
    },

    lastName: {
        type: String,
        require: true,
    },

    age: {
        type: Number,
        require: true,
        min: [1, 'Too young to be a friend'],
        max: [120, 'Too old to be a friend']
    },

    createOn: {
        type: Date,
        require: true,
        default: Date.now()
    }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;