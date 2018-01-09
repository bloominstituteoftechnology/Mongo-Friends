const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  postImagePath: {
    type: String,
  },
  // comments: {
  //   type: String,
  // },
  createOn: {
    type: String,
    required: true,
    default: Date.now
  },
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;