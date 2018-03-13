const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  createdOn:{
    type: Date,
    default: new Date,
  },

});

const FriendModel = mongoose.model('friend', friendSchema);

module.exports = FriendModel;
