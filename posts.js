const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  created_at: {
		type: Date,
		default: Date.now(),
  }
});

module.exports = mongoose.model('Posts', PostSchema);
