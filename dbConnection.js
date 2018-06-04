const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/frienddb', {}, error => {
  error
    ? console.log('Database connection failed.', error)
    : console.log('Successfully connected to MongoDB');
});