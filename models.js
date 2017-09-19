const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const BlogPostSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model('Users', UserSchema);
const BlogPosts = mongoose.model('BlogPosts', BlogPostSchema);

module.exports = {
  Users: Users,
  BlogPosts: BlogPosts
}