import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema ({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  bio: {
    type: String,
    default: ""
  }
});

export default mongoose.model('User', User);
