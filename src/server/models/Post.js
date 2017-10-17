import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema ({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: String,
    default: ""
  }
});

export default mongoose.model('Post', Post);
