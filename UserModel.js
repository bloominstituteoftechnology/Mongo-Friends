const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('User', UserSchema);
