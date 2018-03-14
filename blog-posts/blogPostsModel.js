const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    default: new Date
  },
  userName: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: true,
    maxlength: 100
  }
})

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
