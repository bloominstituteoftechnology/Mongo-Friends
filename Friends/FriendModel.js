const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
