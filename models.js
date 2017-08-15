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

const PostSchema = new mongoose.Schema({
  username: {
    type: 'string'
  },
  comment: {
    type: 'string'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = {
  User,
  Post
};