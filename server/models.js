const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  blogPosts: {
    type: Object,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;