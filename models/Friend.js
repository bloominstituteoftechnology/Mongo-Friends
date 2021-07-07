const mongoose = require('mongoose');
module.exports = mongoose.model('friend', new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  }, 
  {
    timestamps: true,
  }
));
