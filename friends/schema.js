const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  // write schema here
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
      type: String,
      required:true,
  },
  age: {
      type: Number,
  },
  _id: {
      type: String,
      required: true,
      unique: true
  },
  created_at: {
      type: String,
      required: true,
      unique: true,
      default: Date.now()
  },
  active: {
      type: Boolean
  },
  address: AddressSchema
});

const AddressSchema = new Schema({
    street: String,
    zip: String,
    building: String
});

{ 
  "username": "coolUser@cooluser.com",
  "password": "IamSoCool",
  "age": 31,
  "_id": "5b17edd8f08709333a7dc430",
  "created_at": 2014-09-05 18:00:00.000,
  "active": true,
  "address": {
    "street": "123 Alpine Way",
    "zip": "55039",
    "building": "350"
  },
  "friends": ["5b17edeaf08709333a7dc431", "5b17ebe552b95a32c34e99ac"]
}
const schemaModel = mongoose.model('Schema', TestSchema);
module.exports = schema;