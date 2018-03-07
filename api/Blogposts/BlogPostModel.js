const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
