const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: [ 1 ], max: [ 120 ] },
  createdOn: { type: Date, default: Date.now() }
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;