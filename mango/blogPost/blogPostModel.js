const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  user: { type: 'Mixed', required: true, },
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);