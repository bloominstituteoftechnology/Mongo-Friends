const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        validate: titleValidator,
        msg: `Title too long`,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    comments: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

function titleValidator(title) {
    return title.length < 30;
}


const PostsModel = mongoose.model('Posts', PostsSchema);

module.exports = PostsModel;