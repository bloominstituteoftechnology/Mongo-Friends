const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
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
    min: [1, 'The age should be 1 or greater'],
    max: [120, 'The age should be 120 or less'],
  }
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
