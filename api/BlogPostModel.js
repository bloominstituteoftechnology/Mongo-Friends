const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  meta: {
    votes: Number,
    favs: Number
  }
}, { capped: 500000 })

module.exports = mongoose.model('BlogPost', PostSchema);