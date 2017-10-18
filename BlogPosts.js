const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'You must supply an authorId',
  },
  title: {
    type: String,
    required: 'You need to supply a title',
  },
  body: {
    type: String,
    required: 'You need to supply a body for the post',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
