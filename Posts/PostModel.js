const mongoose = require('mongoose');
const Author = require('../Friends/FriendModel.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'Friend',
    index: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;
