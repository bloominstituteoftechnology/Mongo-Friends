const mongoose = require('mongoose');
const User = require('./users.js');

const BlogPosts = new mongoose.Schema({
  // reference username with specific blog post
  post: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});