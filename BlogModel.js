const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  // TODO: write your schema here
  userId: {
      type: String,
      required: true
  },
  blogPost: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Blog", BlogSchema);