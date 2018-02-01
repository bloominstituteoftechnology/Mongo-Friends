const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostsSchema = new Schema({
  post: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const BlogPostsModel = mongoose.model('BlogPosts', BlogPostsSchema);

module.exports = BlogPostsModel;
