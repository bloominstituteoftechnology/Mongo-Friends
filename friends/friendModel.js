const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true }, // should be an integer between 1 and 120
    createdOn: { type: Date, required: true, default: Date.now() }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;
