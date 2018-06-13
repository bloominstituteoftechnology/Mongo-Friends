const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const friendSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:true,
    minimum:1,
    maximum:120,
  },
  createdOn:{
    type:Date,
    default:Date.now,
  },
  //email mobile number github user facebook user twitter handle
  contactInfo:{
    _id:{
      type:String,
      default: function() {return new ObjectId()}
    },
    email:{
      type:String,
    },
    gitHub:{
      type:String,
    },
    facebook:{
      type:String,
    },
    twitter:{
      type:String,
    },
    mobileNumber:{
      type:String,
    }
  }
});
const friendModel = mongoose.model('Friend',friendSchema);
module.exports = friendModel;
