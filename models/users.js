const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String,
        minlength: [1, 'needs to have at least 1 character'],
        required: true},
  friends:[{name: {type:String}}]
});

module.exports = mongoose.model('User', UserSchema);