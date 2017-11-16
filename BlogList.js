const mongoose = require('mongoose');
const BlogListSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true
  },
  blogName:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BlogList', BlogListSchema);