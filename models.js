const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const BlogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Blogpost', BlogpostSchema);

module.exports = mongoose.model('Users', UserSchema);
