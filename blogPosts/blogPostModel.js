const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const BlogPostModel = mongoose.model('FakeBookPosts', BlogPostSchema);

module.exports =  BlogPostModel;