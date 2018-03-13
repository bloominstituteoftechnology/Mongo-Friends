const mongoose = require("mongoose");

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
    validate: ageValidator,
    msg: "Should be an integer between 1 and 120",
  },
});

function ageValidator(age) {
  return age <= 1 && age <= 120;
}

const FriendModel = mongoose.model("Friend", FriendSchema);

module.exports = FriendModel;
