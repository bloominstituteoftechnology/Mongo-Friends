const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);