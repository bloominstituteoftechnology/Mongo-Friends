const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
