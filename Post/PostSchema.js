const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
      type: String,
      required: true
  },  
  content:{
    type: String,
    required: true
  },
  tags: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);