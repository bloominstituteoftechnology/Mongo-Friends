const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
  },  
  firstName:{
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 13,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);