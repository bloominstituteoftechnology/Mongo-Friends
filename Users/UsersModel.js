const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true,
    default: "member"
  },
  userAccountLevel: {
    type: String,
    required: true,
    default: "free"
  },
  createdOn: {
    type: String,
    required: true,
    default: Date.now
  },
  
});

const UserModel = mongoose.model('User', UsersSchema);

module.exports = UserModel;