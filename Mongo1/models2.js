const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    contents: String
});
  
module.exports = mongoose.model('Post', postSchema);
