const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendController = require('./friends/friendController'); 

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.get('/', (req, res) => {
//   res.status(200).json({ api: 'running' });
// });

mongoose.Promise = global.Promise; //added to implement promise functionality (thenify)

mongoose.connect('mongodb://localhost/dbFriends', {}, (err) => { //operational check 
  if(err) console.log(err);
  console.log("Successfully Connected to MongoDB");
}); 

const port = process.env.PORT || 8888;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`)); //operational check

//project set up
  // Getting the Starter Files
    // 1. yarn install in root
    // 2. yarn start to get the server running
  // Use Postman to Test the API.
  // Connect API Server to MongoDB
    // 1. Use yarn or npm to add mongoose to to the project.
// Inside server.js, require mongoose and use it to connect your API to the beardb database

