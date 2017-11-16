const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const server = express();

server.use(cors());
server.use(bodyParser.json());

require('./Users/userEndpoints.js')(server);
require('./BlogPosts/blogEndpoints.js')(server);

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then(function(db){
    console.log('All your databases are belong to us!');
    server.listen(3456, function() {
      console.log('Server running on port 3456');
    });
  })
  .catch(function(err) {
    console.log('Database connection failed', err.message);
  });
