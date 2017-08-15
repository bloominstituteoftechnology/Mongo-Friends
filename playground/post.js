const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = { Post };