const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend',
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  comments: [{
    comment: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    }
  }],
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
