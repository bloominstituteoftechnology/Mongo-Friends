const mongoose = require('mongoose');

/* A schema is a description of the format of documents within a
 * collection. In this case, each Bear is a document of the form:
 *
 * {
 *   species: "American Black Bear",
 *   latinName: "Ursus americanus",
 *   createdAt: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)
 * }
 *
 * Make createdAt default to the current date.
 */
const UsersSchema = new mongoose.Schema({
  // TODO: write your schema here
  christianName: {
    type: String,
  },
  surName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    default: 1971,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', UsersSchema);
