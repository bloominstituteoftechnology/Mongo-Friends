const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  title: {
    type: String
  },
  contents: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UsersSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model('Users', UsersSchema);
const BlogPosts = mongoose.model('BlogPosts', PostsSchema);

module.exports = {Users, BlogPosts};