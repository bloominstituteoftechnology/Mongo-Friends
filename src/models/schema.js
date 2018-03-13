const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
 firstName: {
   type: String,
   required: true,
 },
 lastName: {
   type: String,
   required: true,
 },
 age: {
   type: Number,
   required: true,
 },
 createdOn: {
   type: Date,
   timestamp: Date.now,
 }
});

const BearModel = mongoose.model('Friends', FriendSchema);

module.exports = FriendSchema;