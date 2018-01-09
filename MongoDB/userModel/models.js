const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  species: {
    type: String,
  },
  latinName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});