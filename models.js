const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // TODO: write your schema here
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
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

const User = mongoose.model('User', UserSchema);

const BlogPosts = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },  
});

const Blog = mongoose.model('Blog', BlogPosts);

module.exports = {User, Blog};