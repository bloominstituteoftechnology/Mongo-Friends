const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String,
    require: true
  },
  age: {
    type: Number, 
    require: true
  },
  createdOn: {
    type: Date, 
    default: Date.now()
  }
});

const friendsModel = mongoose.model('Friend', FriendSchema); 

module.exports = friendsModel;