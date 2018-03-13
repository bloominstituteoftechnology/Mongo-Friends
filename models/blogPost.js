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
    
    });

    const BlogModel = mongoose.model("blogPost", BlogSchema)

module.exports = BlogModel;