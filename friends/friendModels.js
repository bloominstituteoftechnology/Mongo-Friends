const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
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
    min: [1, 'Must be a number greater than 1'],
    max: [120, 'Must be a number less than 120'],
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: titleLengthValidator,
      message: 'Title must be at least ten characters long.',
    },
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

function titleLengthValidator(title) {
  return title.length > 10;
}

const FriendModel = mongoose.model('Friend', FriendSchema);
const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

/*

Send this to Luis:
>Hey Luis, I'm solving the conditional for the number with min
and max, but can you post your code from earlier so I can see
how you were handling the validations with the function?

He replied with:

password: {
   type: String,
   validate: passValidator,
   msg: 'password too short',
 },

 ----

function passValidator(password) {
 return password.length >= 15;
}

*/
