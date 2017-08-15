const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./model');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else if (user === null) {
      res.json({ error: 'bear not found' });
    } else {
      res.json(user);
    }
  });
});

server.post('/users', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide username and password' });
    return;
  }
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an id' });
    return;
  }
  User.remove({ _id: id }, (err, removedUser) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
    res.json(removedUser);
    }
  });
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server listening on ${port}`);
}, (err) => {
  console.log('\n***************');
  console.log("ERROR: Couldn't connect to MongoDB.  Do you have it running?");
  console.log('***************\n');
});
