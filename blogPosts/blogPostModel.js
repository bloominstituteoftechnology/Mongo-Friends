const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    validate: {
      validator: contentValidator,
      message: "One's conent must always refer to oneself."
    }
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

function contentValidator(content) {
  return content.includes('I ');
}

const BlogPostModel = mongoose.model('FakeBookPosts', BlogPostSchema);

module.exports =  BlogPostModel;