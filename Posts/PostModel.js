const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Author = require('../Friends/FriendsModel.js');

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'Friend',
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
