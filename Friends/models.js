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

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
