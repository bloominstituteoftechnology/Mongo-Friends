const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

module.exports = { mongoose, connect };