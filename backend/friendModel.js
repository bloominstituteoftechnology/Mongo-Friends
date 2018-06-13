//Three:
// import mongoose
const mongoose = require("mongoose");
//Create a schema that the database will follos to add friends

const definition =
{
    firstName: {
        type: String, // String, required
        required: true,
        index: true
    },
    lastName: {
        type: String,  // String, required
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    githubUserName: {
        type: String
    },
    facebookUserName: {
        type: String
    },
    twitterHandle: {
        type: String
    },

    createdOn: {
        type: Date,
        default: Date.now
    } // Date, required, defaults to current date
};

  const options ={
      timestamps:true,
    };

  const friendSchema = new mongoose.Schema(definition, options).index({lastName: 1, createdOn: -1});

  const friendModel = mongoose.model("Friend", friendSchema, "friends");
  

  module.exports = friendModel;