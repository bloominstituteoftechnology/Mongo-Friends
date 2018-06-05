const mongoose = require("mongoose");

const friendSchema = {
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
    max: 120,
    min: 1
  },

  createdOn: {
    type: Date,
    default: Date.now
  }
};
