const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  jobTitle: {
    type: String,
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;