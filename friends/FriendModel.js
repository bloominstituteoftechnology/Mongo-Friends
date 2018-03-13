const mongoose = require('mongoose');

const blogPosts = require('../blogposts/BlogPostModel.js');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogPosts' }],
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
