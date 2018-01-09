const mongoose = require('mongoose'); 

// create a mongoose schema
// the first argument describes the schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);
// use the above schema to create a model
// mongoose model accepts two parameters first: singular name for the model(user)
// the second argument is

// const UserModel = mongoose.model('Users', UserSchema); // model generated

// module.exports = UserModel;  making this model available for server.js