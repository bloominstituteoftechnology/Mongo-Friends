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
    required: true,
    min: [1, 'Have to be at least 1 year old'],
    max: [120, 'Have to be less than 121 years old']
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const FriendModel = mongoose.model('FakeBook', FriendSchema);

module.exports =  FriendModel;