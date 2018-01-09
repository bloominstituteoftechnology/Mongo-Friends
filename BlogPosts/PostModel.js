const mongoose = require( 'mongoose');

const PostSchema= new mongoose.Schema ({
usernameOfPoster:{
    type: String,
    required: true
},
content:{
    type: String,
    required: true
}
});

const PostModel = mongoose.model('Post', PostSchema);

module.export = PostModel;