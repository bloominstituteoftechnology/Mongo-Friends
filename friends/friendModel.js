const mongoose = require('mongoose');

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
        required: true,
    }, 
    lastName: {
        type: String, 
        required: true
    },
    age: {
        type: Number,
        required: true,
        minimum: 1, 
        maximum: 120
    },
    createdOn: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    contactInfo: {
        
    }
})

const friendsModel = mongoose.model('Friend', FriendSchema);
module.exports = friendsModel;