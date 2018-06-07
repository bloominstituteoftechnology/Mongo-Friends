const mongoose = require('mongoose');

const FriendSchemea = new mongoose.Schema({
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
       reqired: true,
       default: Date.now()
   },
})

