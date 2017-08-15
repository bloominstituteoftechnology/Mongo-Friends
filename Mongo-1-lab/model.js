const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:  {
    type: String,
  }
  // id: {
  //   type: String,
  // }

});



module.exports = mongoose.model('Users', UserSchema);
