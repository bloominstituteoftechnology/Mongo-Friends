const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
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
    min: 1,
    max: 120,
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now()
  }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;
