const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 13
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 13
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
    required: true
  },
  createdOn: {
    date: Date
  }
});

const friendsModels = mongoose.model('Friend', friendSchema);

module.exports = friendsModels;
