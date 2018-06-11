//Three:
// import mongoose
const mongoose = require("mongoose");
//Create a schema that the database will follos to add friends

const definition =
{
    firstName: {
        type: String, // String, required
        required: true
    },
    lastName: {
        type: String,  // String, required
        required: true
    },
    age: {
        type: Number,
        required: true // Number, required, should be an integer between 1 and 120
    },

    createdOn: {
        type: Date,
        default: Date.now
    } // Date, required, defaults to current date
  };



  const friendSchema = new mongoose.Schema(definition);

  const friendModel = mongoose.model("Friend", friendSchema, "friends");

  module.exports = friendModel;