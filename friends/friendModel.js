const mongoose = require('mongoose');


// Schema

// {
//     firstName: "Jane", // String, required
//     lastName: "Doe",  // String, required
//     age: 18, // Number, required, should be an integer between 1 and 120
//     createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
// }

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String, // There are many types in Mongoose that we'll learn about this week
        required: true, // required is a validator. It tells us that this field is required
      },
      lastName: {
        type: String,
        require: true,
      },
      age: {
        type: Number,
        require: true,
      },
      createOn: {
        type: Date, // Date is a nother type in Mongoose.
        default: Date.now(),
      },
    });

    const friendsModel = mongoose.model('Friend', FriendSchema); // this is where we declare this as a model.
    // by passing our BearSchema to this model we decalre that it will be a collection in our DB

    module.exports = friendsModel;