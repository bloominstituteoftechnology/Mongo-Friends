const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;