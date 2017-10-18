const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'You must supply a username',
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: 'You must supply an email',
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', UserSchema);
