const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
