const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide firstName, lastName and age for the friend.']
    }
});


module.exports = mongoose.model('Friend', FriendSchema);