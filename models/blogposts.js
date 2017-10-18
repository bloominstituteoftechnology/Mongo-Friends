const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogPostSchema = new Schema({
  title: {type: String, minlength: [1, 'has to have minimum length of 1']},
  contents:  {type: String},
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);