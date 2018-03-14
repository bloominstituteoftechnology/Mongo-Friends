const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  posterName: {
    type: String,
    required: [true, "Please provide the poster's name"]
  },
  content: {
    type: String,
    required: [true, 'Please provide the post content']
  },
  comments: [{
    type: String,
  }],
  createdOn: {
    type: String,
    required: true,
    default: new Date(),
  }
});

// FriendSchema.pre('findByIdAndUpdate', function(next) {
//   this.options.runValidators = true;
//   next();
// });

module.exports = mongoose.model('Blog', BlogSchema);