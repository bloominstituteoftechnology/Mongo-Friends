const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
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
    required: true,
    min: [1, "Age must be a number between 1 and 120."],
    max: [120, "Age must be a number between 1 and 120."]
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Friends = mongoose.model("Friend", friendSchema);

module.exports = Friends;
