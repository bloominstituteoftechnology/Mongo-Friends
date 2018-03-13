const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: Number
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Friend', FriendSchema);
