const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');

server.use(bodyParser.json());
server.use(cors())

require('./routes.js')(server);

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/users',
  { useMongoClient: true }
).then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
