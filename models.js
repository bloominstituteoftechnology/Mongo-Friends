const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  species: {
    type: String,
  },
  planet: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const PostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   post: {
//     type: String,
//   },
//   createOn: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = { Users: UserSchema, Posts: PostSchema };
module.exports = mongoose.model('Users', UserSchema);