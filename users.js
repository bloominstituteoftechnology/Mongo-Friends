const mongoose = require('mongoose');

// Create Users Schema here

const UserSchema = new mongoose.Schema({
  // user will have a username, email, password, date created
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, //maybe enum this for a required number of characters?
    enum
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Users", UserSchema);