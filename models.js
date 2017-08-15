const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: 'string'
  },
  password: {
    type: 'string'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);