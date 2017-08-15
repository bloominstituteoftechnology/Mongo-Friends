const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OK = 200;

const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must enter name and age for user." });
    return;
  }
  const user = new User({ name, age });
  user.save(() => {
    res.status(STATUS_OK);
    res.json(user);
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.status(STATUS_OK);
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.status(STATUS_OK);
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.status(STATUS_OK);
    res.json(user);
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/exercise1',
  { useMongoClient: true }
);
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Running`);
}, (err) => {
  console.log(`ERROR: Couldn't Connect!`);
});
