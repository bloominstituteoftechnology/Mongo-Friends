const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // User: write your schema here
  userName: {
    type: String,
  },
  // password: {
  //   type: String
  // }
  fullName: {
    type: String,
  },
  // email: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogSchema = new mongoose.Schema ({
  title: {
    type: String,
  },
  contents: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);
const BlogPost = mongoose.model('BlogPost', BlogSchema);
module.exports = {
  User,
  BlogPost
}