const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Friend = require('../Friends/FriendModel');

const BlogPostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  author: {
    type: ObjectId,
    ref: 'Friend',
  }
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
