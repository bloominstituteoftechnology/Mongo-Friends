const mongoose = require('mongoose');



//     firstName: "Jane", // String, required
//     lastName: "Doe",  // String, required
//     age: 18, // Number, required, should be an integer between 1 and 120
//     createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date


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
        required: true,
        min: 1,
        max: 120
    },
    createdOn: {
        type: Date,
        default: Date.now()

    }
})

const friendModel = mongoose.model('Friend', FriendSchema);

module.exports = friendModel;
