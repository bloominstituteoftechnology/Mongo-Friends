//here we'll create a shape for all our documents that come in. We will build a model for bears. 
const mongoose = require('mongoose');

//The model is where we define the schema. It's a blueprint of what our collection will look like
// collection will be what our model is called

// Schema
// {
//     firstName: "Jane", // String, required
//     lastName: "Doe",  // String, required
//     age: 18, // Number, required, should be an integer between 1 and 120
//     createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
//   }

const FriendSchema = new mongoose.Schema({
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
        defualt: Date.now()
    } 
});

const friendsModel = mongoose.model('Friend', FriendSchema); //lowercase 'Friend'

module.exports = bearsModel;



