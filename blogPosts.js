const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Posts', PostSchema);