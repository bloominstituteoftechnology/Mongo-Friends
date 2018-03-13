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
   min: [1, 'Age should be greater than 1'],
   max: [120, 'Age should be lower than 120'],
   required: true,
 },
 createdOn: {
   type: Date,
   timestamp: Date.now,
 }
});

const FriendModel = mongoose.model('Friends', FriendSchema);

module.exports = FriendModel;