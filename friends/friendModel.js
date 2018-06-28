const mongoose = require('mongoose');
const definition = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  contactInfo: {
    email: {
      type: String
    },
    mobile: {
      type: Number
    },
  }
}

const options = {
  timestamps: true,
}


const friendSchema = new  mongoose.Schema(definition, options);
const friendModel = mongoose.model('Friend', friendSchema, 'friends');
// const friendModel = mongoose.model('model_name', Schema_name, 'collection_name');
//.connect('mongodb://host_name/database_name')

module.exports = friendModel;