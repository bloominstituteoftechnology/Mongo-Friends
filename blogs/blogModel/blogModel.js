const mongoose = require('mongoose');

// const ageFail = "Age must be a whole number between 1 and 120"

const blogSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
    validate: [validateString, 'Custom error'],
  },
  password: {
    type: String,
    required: true,
    validate: [validateString, 'Custom error'],
  },
  blogContent:{
    type: String,
    required: true,
  },
  createdOn:{
    type: Date,
    default: new Date,
  },
});

function validateString(string) {
  
};

const BlogModel = mongoose.model('blog', blogSchema);

module.exports = BlogModel;
