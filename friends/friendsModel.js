// const mongoose = require("mongoose");

// const FriendSchema = mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   createdOn: {
//     type: Date,
//     default: Date.now()
//   }
// });

// // {       <----  Example Friend Schema?  ----->
// //     firstName: "Jane", // String, required
// //     lastName: "Doe",  // String, required
// //     age: 18, // Number, required, should be an integer between 1 and 120
// //     createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
// //   }

// //instantiating const friendsModel with mongoose model with FriendSchema
// //and namespacing it "Friend"
// const friendsModel = mongoose.model("Friend", FriendSchema);

// module.exports = friendsModel;

const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
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
    min: 1,
    max: 120
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
  // contactInfo: {
  //   email: {
  //     type: String,
  //     required: true
  //   },
  //   mobileNumber: {
  //     type: Number
  //   },
  //   github: {
  //     type: String
  //   },
  //   facebook: {
  //     type: String
  //   },
  //   twitter: {
  //     type: String
  //   }
  // }
});

const friendsModel = mongoose.model("Friend", friendSchema);

module.exports = friendsModel;
