const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  blogPosts: {
    type: Array,
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = { User };