const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
}