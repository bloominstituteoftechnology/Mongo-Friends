const mongoose = require('mongoose');
const BlogPostSchema = new mongoose.Schema({
  blogpost: {
    type: String
  }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);