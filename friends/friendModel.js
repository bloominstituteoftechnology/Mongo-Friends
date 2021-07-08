const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
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
    max: 120,
    // to force integer
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
    // http://mongoosejs.com/docs/schematypes.html // search integerOnly
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
})

const friendModel = mongoose.model('Friend', friendSchema);

module.exports = friendModel;