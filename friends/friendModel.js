const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({});

const friendModel = mongoose.model('Friend', friendSchema); // this is the friends collection

module.exports = friendModel;
