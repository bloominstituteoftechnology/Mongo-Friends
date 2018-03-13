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
  createdOn: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      comment: {
        type: String,
        // required: true,
      },
    },
  ],
});

const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPostModel;
