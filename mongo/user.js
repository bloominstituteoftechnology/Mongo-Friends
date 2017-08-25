const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
  'mongodb://localhost/users-db',
  { useMongoClient: true }
);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
