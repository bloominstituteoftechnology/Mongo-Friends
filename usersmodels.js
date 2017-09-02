const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username: String,
    password: String
});

//---------------------------------------
// const BlogPosts = new mongoose.Schema ({
//     blog: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

module.exports = mongoose.model('User', UserSchema);
//module.exports = mongoose.model('Blog', BlogPosts);