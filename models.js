const mongoose = require('mongoose');

/* A schema is a description of the format of documents within a
 * collection. 
 *
 * Make createdAt default to the current date.
 */
const UserSchema = new mongoose.Schema({
  // TODO: write your schema here
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  } ,
  address: {
    street1: {
      type: String,
      required: true
    },
    street2: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      region: { type: Number, required: true},
      plus4: { type: Number, required: false} 
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);
