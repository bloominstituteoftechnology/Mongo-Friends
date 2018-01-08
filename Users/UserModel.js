const mongoose = require('mongoose');  // schema-based app data modeling

const UserSchema = new mongoose.Schema({  // defines UserSchema as a new mongoose Schema as follows
  username: {
    type: String,
    required: true      // username is required, user must supply
  },
  fullName: {
    type: String,
    required: true      // fullName is required, user must supply
  },
  password: {
    type: String,
    required: true      // password is required, user must supply
  },
  createdAt: {
    type: Date,
    default: Date.now   // current date and time assigned by server at time of user creation
  },
});

module.exports = mongoose.model('User', UserSchema);  // exports the UserSchema as User