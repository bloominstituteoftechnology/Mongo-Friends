const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  contents: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', PostSchema);

module.exports = {
  User,
  Blog,
}
