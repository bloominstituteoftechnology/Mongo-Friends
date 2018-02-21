const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const BlogPost = require('../BlogPosts/BlogPostModel.js');

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
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  posts: [{
    type: ObjectId,
    ref: 'BlogPost',
  }]
});

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;