const mongoose = require('mongoose');
const friendSchema = new mongoose.Schema(){
  firstName:{
    type:String,
    required:true,
  }),
  lastName:{
    type:String,
    required:true,
  }),
  age:{
    type:Number,
    required:true,
    minimum:1,
    maximum:120,
  },
  createdOn{
    type:Date,
    default:Date.now,
  },
});
