const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // TODO: write your schema here
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  } ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);