const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({

  createdAt: {
    type: Date,
    default: Date.now()
  },
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
    required: true,
    min: 1,
    max: 120
  }
});

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;