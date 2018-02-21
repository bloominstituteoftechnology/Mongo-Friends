const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
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


module.exports = mongoose.model('Blog', BlogSchema);