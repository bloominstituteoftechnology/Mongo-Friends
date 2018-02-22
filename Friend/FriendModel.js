const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FriendSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  createdOn: { type: Date, required: true, default: Date.now },
  posts: [{ type: ObjectId, ref: "Post" }]
});

const FriendModel = mongoose.model("Friend", FriendSchema);

module.exports = FriendModel;
