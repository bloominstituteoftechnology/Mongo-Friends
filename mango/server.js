const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const mongoose = require('mongoose');

const server = express();

const Users = require('./models.js');

server.use(bodyParser.json());
// server.use(cors());

/* *** Status *** */
const STATUS_USER_ERROR = 422;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const STATUS_SUCCESS = 200;

/* *** Error Message *** */
const USER_ERROR = { error: 'Something wrong with user submission' };
const NOT_FOUND_ERROR = { error: 'couldn\'t find the requested user.' }
const SERVER_ERROR = { error: 'Something went wrong with the server'};

/* *** Port *** */
const port = 3000;

server.get('/api/users', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) res.status(STATUS_SERVER_ERROR).send(SERVER_ERROR);
    else res.status(STATUS_SUCCESS).send(users);
  });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id, (err, user) => {
    if (err) res.status(STATUS_NOT_FOUND).send(NOT_FOUND_ERROR);
    else res.status(STATUS_SUCCESS).send(user);
  });
});

server.post('/api/users', (req, res) => {
  const newUser = new Users(req.body);

  newUser.save((err, user) => {
    if (err) res.status(STATUS_USER_ERROR).send(USER_ERROR);
    else res.status(STATUS_SUCCESS).send(user);
  });
});

server.delete('/api/users', (req, res) => {
  const { id } = req.body;

  Users.findById(id, (err, user) => {
    if (err) res.status(STATUS_NOT_FOUND).send(NOT_FOUND_ERROR);
    else return user;
  }).remove((err, confirm) => {
    if (err) res.status(STATUS_SERVER_ERROR).send(SERVER_ERROR);
    else res.status(STATUS_SUCCESS).send(confirm);
  });
});

/* Plumbing */
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then((db) => {
    console.log('All your databases belong to us!');
    server.listen(port, () => {
      console.log(`server running on port ${port}!`);
    });
  })
  .catch((err) => {
    console.log('database connection failed', err.message);
  });
