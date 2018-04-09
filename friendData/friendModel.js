const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        //requried: true, 
    },
    createdOn:{
       type: Date,
       default: Date.now,
    },
// {
//   firstName: "Jane", // String, required
//   lastName: "Doe",  // String, required
//   age: 18, // Number, required, should be an integer between 1 and 120
//   createdOn: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, required, defaults to current date
// }

});

const friendModel = mongoose.model('friendData', friendSchema); 
module.exports = friendModel;