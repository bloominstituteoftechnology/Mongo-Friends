const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 1, max: 120 },
  createdOn: { type: Date, default: Date.now }
});

const friendModel = mongoose.model("Friend", friendSchema);

module.exports = friendModel;
