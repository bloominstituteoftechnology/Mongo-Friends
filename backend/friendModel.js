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
        required: true // Number, required, should be an integer between 1 and 120
    },

    contact_info :{

        email: {
            type: String,
            required: false
            
        },
        mobileNumber: {
            type: String,
            required: false
        },
        githubUserName: {
            type: String,
            required: false
        },
        facebookUserName: {
            type: String,
            required: false
        },
        twitterHandle: {
            type: String,
            required: false
        }

    },

    createdOn: {
        type: Date,
        default: Date.now
    } // Date, required, defaults to current date
  };

  const options ={
      timestamps:true,
      strict: false
    };

  const friendSchema = new mongoose.Schema(definition, options).index({lastName: 1, createdOn: -1});

  const friendModel = mongoose.model("Friend", friendSchema, "friends");
  

  module.exports = friendModel;