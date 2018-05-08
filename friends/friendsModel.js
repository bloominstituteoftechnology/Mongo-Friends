const mongoose = require('mongoose');

const defineSchema = {

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
    default: Date.now
  }

}

const options = { timestamps: true }

const friendSchema = new mongoose.Schema(defineSchema, options)

const friendsModel = mongoose.model('Friend', friendSchema, 'friends')
// module.exports = mongoose.model('Friend', friendSchema, 'friends')
module.exports = friendsModel;