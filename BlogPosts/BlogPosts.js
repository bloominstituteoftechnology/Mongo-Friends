const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Friend = require("../Friend/FriendModel.js");

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "author",
    index: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPostModel;
