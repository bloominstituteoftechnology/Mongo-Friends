const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
        //edit here
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;