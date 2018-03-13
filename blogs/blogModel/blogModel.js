const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
    validate: [validateuserName, "That ain't a string Bub!"],
  },
  passWord: {
    type: String,
    required: true,
    validate: [validatePwd, 'you want to be safe doncha? Put in a reasonable pwd'],
  },
  blogContent:{
    type: String,
    required: true,
    validate: [validateBlog, 'Put in some more words Bub!'],
  },
  createdOn:{
    type: Date,
    default: new Date,
  },
});

function validateuserName(userName) {
  if (typeof(userName) === 'string') {
    return true;
  }
  return false;
};

function validateBlog(x) {
  if (typeof(x) === 'string') {
    return true;
  }
  return false;
};

//Pwd has to have a number..a capital letter..a special character
function validatePwd(password) {
    const regex1 = /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^\&*\)\(+=._-]).{8,}$)/gm
    return regex1.test(password); 
};

const BlogModel = mongoose.model('blog', blogSchema);

module.exports = BlogModel;
