const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: titleLengthValidator,
      message: 'Must be atleast 5 characters long.',
    },
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
});




const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;