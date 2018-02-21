const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Author = require('../Friends/FriendModel.js');

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'Author',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;