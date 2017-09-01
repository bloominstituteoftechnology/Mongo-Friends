const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const BlogPosts = require('./model.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/posts', (req,res) => {
    //
});

server.get('/posts', (req,res) =>{
    //
});

server.get('/posts/:id', (req,res) =>{
    //
});

server.delete('/posts/:id', (req,res) => {
    //
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/posts',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});