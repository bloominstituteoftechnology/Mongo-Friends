const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(
  'mongodb://localhost/users-db',
  { useMongoClient: true }
);

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
