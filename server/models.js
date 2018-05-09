const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  firstName: { type: String, required: true, index: true, unique: true },
  lastName: { type: String, required: true, index: true, unique: true },
  age: { type: Number, required: true }
};

const option = {
  timestamps: true,
  strict: false
};

const friendSchema = new Schema(definition, option);
//friendSchema.index({ lastName: 1 ; firstName: -1; age: -1})
const friendModel = mongoose.model("Friend", friendSchema, "friends");

module.exports = friendModel;
