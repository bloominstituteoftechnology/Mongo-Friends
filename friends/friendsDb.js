const mongoose = require('mongoose');

const defintion = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age:{
    Type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
}

const options = {
  timestamps: true
};

const friendSchema = new mongoose.Schema(defintion, options)

const friendModel = mongoose.model('Friend', friendSchema, 'friends')

module.exports = friendModel
