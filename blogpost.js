const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

const BlogModel = mongoose.model('BlogPost', BlogSchema);
module.exports = BlogModel;