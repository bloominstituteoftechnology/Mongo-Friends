const mongoose = require("mongoose");

const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

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
  },

  contactInfo: {
    phone: Number,
    email: String,
    gitHub: String,
    twitter: String,
    address: {
      street: String,
      city: String,
      state: {
        type: String,
        uppercase: true,
        required: true,
        enum: statesArray
      },
    }
  }
});

const friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;
