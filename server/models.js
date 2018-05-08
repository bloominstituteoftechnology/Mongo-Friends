const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true }
};

const option = {
  timestamps: true
};

const friendSchema = new Schema(definition, option);

const friendModel = mongoose.model("Friend", friendSchema, "friends");

module.exports = friendModel;
