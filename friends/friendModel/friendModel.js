const mongoose = require('mongoose');

const ageFail = "Age must be a whole number between 1 and 120"

const friendSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  age:{
    type: Number,
    min: [1, ageFail],
    max: [120, ageFail],
    validate: [validateAge, ageFail],
  },
  createdOn:{
    type: Date,
    default: new Date,
  },
});

function validateAge(age) {
  if (age - Math.floor(age) !== 0) {
    return false;
  } else return true;
};

const FriendModel = mongoose.model('friend', friendSchema);

module.exports = FriendModel;
