const mongoose = require('mongoose');

const date = new Date();

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
    required: true
  },
  createdOn: {
    type: Date,
    default: date.toDateString() + ' ' + date.toTimeString()
  }
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
