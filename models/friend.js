const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a firstName']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a lastName']
  },
  age: {
    type: Number,
    required: [true, 'Please provide an age'],
    min: [1, 'Age must be a number between 1 and 120'],
    max: [120, 'Age must be a number between 1 and 120']
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;