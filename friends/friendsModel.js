// Mongoose
const mongoose = require('mongoose');

// Schema
const friendSchema = new mongoose.Schema({
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
    min: 1,
    max: 120,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// declare Model and connect to Schema
const friendsModel = mongoose.model('Friend', friendSchema);

module.exports = friendsModel;
