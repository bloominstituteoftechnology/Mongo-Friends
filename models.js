const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // User: write your schema here
  userName: {
    type: String,
  },
  // password: {
  //   type: String
  // }
  fullName: {
    type: String,
  },
  // email: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);