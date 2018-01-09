const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    min: [1, 'username must be at least 1 character.'],
    max: [50, 'username must be at most 50 characters.']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    min: [1, 'password must be at least 1 character.'],
    max: [50, 'password must be at most 50 characters.']
  }
});

const Users = mongoose.model('User', UserSchema);
module.exports = Users;