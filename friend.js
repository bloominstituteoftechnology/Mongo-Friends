const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    unique: true
  },

  lastName: {
    type: String,
    required: true,
    unique: true
  },

  age: {
    type: Number,
    required: true,
  },

  createOn: {
    type: Date,
    required: true,
    default: Date.now()
  }

});

const friendsModel = mongoose.model('friend', FriendSchema);

module.exports = friendsModel;