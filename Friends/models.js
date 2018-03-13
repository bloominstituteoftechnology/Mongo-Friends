const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
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
    validate: ageValidator,
    msg: 'should be an integer between 1 and 120',
    required: true,
    
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
});

function ageValidator(age) {
  return Number.isInteger(age) && age > 0 && age < 121
}

module.exports = mongoose.model('Friend', FriendSchema);
