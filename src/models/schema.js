const mongoose = require('mongoose');

const BlogPosts = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    timestamp: Date.now,
  },
  updatedOn: {
    type: Date,
    timestamp: Date.now,
  },
});

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
    min: [1, 'Age should be greater than 1'],
    max: [120, 'Age should be lower than 120'],
    required: true,
  },
  blogPosts: [BlogPosts],
  createdOn: {
    type: Date,
    timestamp: Date.now,
  },
});

const FriendModel = mongoose.model('Friends', FriendSchema);

module.exports = FriendModel;
