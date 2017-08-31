const mongoose = require('mongoose');

const user = new mongoose.Schema({
  first: {
      type: String,
      required: true
  },
  last: {
      type: String,
      required: true
  },
  birthday: String,
  date: { 
      type: Date, 
      default: Date.now 
  }
});

const blogPosts = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   
   author: {
       type: String,
       required: true
   },
   content: {
       type: String,
       requried: true
   },
});

const User = mongoose.model('User', user);
const Post = mongoose.model('Post', blogPosts);
module.exports = {
     User,
     Post
}