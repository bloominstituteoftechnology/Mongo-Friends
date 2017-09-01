const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:  {
    type: String,
  }
});

const BlogPostsSchema = new mongoose.Schema({
  post:  {
    type: String,
  },
  blogs: {
      type: String,
  }
});



module.exports = mongoose.model('Users', UserSchema, 'users');
module.exports = mongoose.model('BlogPosts', BlogPostsSchema, 'posts');
