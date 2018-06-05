const mongoose = require('mongoose');

//schema example

// {
//   species: 'Bear Species',
//   latinName: 'latinName',
//   createOn: Date.now();
// }

const FriendsSchema = new mongoose.Schema({ // sets schema

  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
});



const friendsModel = mongoose.model('Friend', FriendsSchema);
module.exports = friendsModel;