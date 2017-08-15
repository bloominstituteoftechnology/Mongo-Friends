/*
Implement a second model called blogPosts
blogPosts should be an array of post objects.
*/

const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  }
});

module.exports = mongoose.model('BlogPosts', BlogPostSchema);
