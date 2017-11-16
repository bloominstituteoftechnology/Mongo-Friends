const express = require('express');                // web app framework for HTTP servers
const cors = require('cors');                      //enables Cross-Origin Resource Sharing (make requests to other origins, or domains)
const bodyParser = require('body-parser');         // extracts the body portion of a request
const mongoose = require('mongoose');              // schema-based app data modeling

const server = express();                          // establish the server using express for HTTP access

server.use(cors());                                // allows us to make requests between ports
server.use(bodyParser.json());                     //allows us to extract request bodies

require('./Users/userEndpoints.js')(server);       // passes server as cb to userEndpoints and imports file
require('./BlogPosts/blogEndpoints.js')(server);   // passes server as cb to blogEndpoints and imports file

mongoose.Promise = global.Promise;                 // google says this sets the promise library to native promises (instead of a custom promise library)
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })  // open 'users' db through port 27017
  .then(function(db){                              // after connecting to users db, execute function with db
    console.log('All your databases are belong to us!');  // output to show db is open and available
    server.listen(3456, function() {               // start server listenting to port 3456
      console.log('Server running on port 3456');  // output to show server is listening on port 3456
    });
  })
  .catch(function(err) {                           // if the connect to users db on port 27017 failed
    console.log('Database connection failed', err.message);  // output connection failure message
  });
