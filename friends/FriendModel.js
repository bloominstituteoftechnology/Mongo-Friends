const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  }, // String, required
  lastName: {
    type: String,
    required: true,
  },  // String, required
  age: {
    type: Number,
    required: true,
  }, // Number, required, should be an integer between 1 and 120
  createdOn: {
    type: Date,
    default: Date.now,
  } // Date, required, defaults to current date
})

module.exports = FriendModel;
