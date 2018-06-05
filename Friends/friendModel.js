const mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      // Regex expression from http://emailregex.com/
      validator: function(v) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: '{VALUE} is not a valid e-mail address!'
    }
  },
  mobileNumber: {
    type: String,
    // Thanks, Mongoose Docs!
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
  },
  githubHandle: {
    type: String,
    minlength: 1,
    maxlength: 39,
  },
});

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
  contactInfo: ContactInfoSchema,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;