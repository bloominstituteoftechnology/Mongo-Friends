const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const BlogSchema = new mongoose.Schema({
	title: String,
	content: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Users = mongoose.model('Users', UsersSchema);
const BlogPost = mongoose.model('BlogPost', BlogSchema);


module.exports = {Users, BlogPost};