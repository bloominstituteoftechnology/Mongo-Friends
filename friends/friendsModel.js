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
  }
})

// function checkAgeLength(age) {
//   return age > 1 && age < 120
// }

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
