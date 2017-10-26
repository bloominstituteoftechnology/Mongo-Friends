const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model('Users', UserSchema);
