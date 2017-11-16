const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());

require('./User/userEndpoints.js')(server);
require('./Post/postEndpoints.js')(server);

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});