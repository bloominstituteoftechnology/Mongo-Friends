const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models.js');

server.use(bodyParser.json());

server.post('/users', (req, res) => {
    //
});

server.get('/users', (req, res) => {
    //
});

server.get('/users', (req, res) => {
    //
});

server.delete('/users', (req, res) => {
    //
});

const users = new Users({});



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
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