const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
    require: true
  },
  createOn: {
    type: Date,
    default: Date.now()
  }
});

const friendsModel = mongoose.model('Friend', FriendSchema);

module.exports = friendsModel;
