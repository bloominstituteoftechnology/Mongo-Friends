const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const BlogPost = require('../Posts/PostModel.js');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
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
    ref: 'Post',
  }],
});

const FriendsModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendsModel;