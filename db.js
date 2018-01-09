const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Mongo-I');

const db = mongoose.connection;

module.exports = db;