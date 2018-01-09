const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
//   Post: {
//     type: String,
//     required: true,
//   },
//   createdOn: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;