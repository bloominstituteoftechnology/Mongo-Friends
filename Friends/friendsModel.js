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
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Friends = mongoose.model("Friend", friendSchema);

module.exports = Friends;
