const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = mongoose.Schema({
    firstName: String, // String, required
    lastName: String,  // String, required
    age: Number, // Number, required, should be an integer between 1 and 120
    createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
})

module.exports = mongoose.model("Friend", FriendSchema);