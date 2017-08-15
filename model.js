const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
    password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema, 'BlogPost', BlogPost);
