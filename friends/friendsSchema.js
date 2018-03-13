const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const FriendsModel = mongoose.model('Friend', FriendsSchema);

module.exports = FriendsModel;
