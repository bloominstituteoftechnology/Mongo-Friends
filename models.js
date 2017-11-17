const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  description: {
    type: String
  },
  nutrients: {
    water: { units: String, value: Number },
    salt: { units: String, value: Number },
    energy: { units: String, value: Number }
  }
});

module.exports = mongoose.model('user', UserSchema);
