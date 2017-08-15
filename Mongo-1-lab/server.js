const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('./model.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const name = req.body.name;
  console.log('happy');
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'these are not present' })
    return;
  }
  const users = new Users({ name });
  users.save((err) => {
    if (err) {
      res.status (STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(users);
    }
  });

});

server.get('/users', (req, res) => {
    //
});

server.get('/users/:id', (req, res) => {
    //
});

server.delete('/users:id', (req, res) => {
    //
});




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
