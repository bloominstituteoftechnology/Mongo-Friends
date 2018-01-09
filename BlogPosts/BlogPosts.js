const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const BlogModel = mongoose.model('Post', BlogSchema);

module.exports = BlogModel;