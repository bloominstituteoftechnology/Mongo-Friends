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
    validation: ageValidation,
    message: 'Age must be a whole number between 1 and 120.'
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

function ageValidation(age) {
  if(isNaN(age) || age < 1 || age > 120) {
    return false;
  }
  return true;
}