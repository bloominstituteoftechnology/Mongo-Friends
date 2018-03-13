const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        default: "Bob Saget"
    },
    header: {
        type: String,
        required: true,
        default: "Title Header"
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    postContent: {
        type: String,
        required: true,
        default: "Write Body Content Here"
    },
    keywords: {
        type: Array,
        required: true,
        default: ["Blog", "Post"]
    }
});

const BlogModel = mongoose.model("blogPost", BlogSchema)

module.exports = BlogModel;