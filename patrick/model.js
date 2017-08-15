const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BearSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', UserSchema);
