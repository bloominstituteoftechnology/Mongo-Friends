const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
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
