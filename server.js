const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./UserModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// POST /users = saves a new user to the server
server.post('/users', (req, res) => {
  const newUser = new User(req.body);

  // check the user has all the data here...

  // ...and save the user if it does:
  newUser.save((err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not create the user" });
    } else {
      res.status(200).json(user);
    }
  });
});

// GET /users = returns an array of all users
server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not return the users" });
    } else {
      res.status(200).json(users);
    }
  });
});

// GET /users/:id = return the user w/ matching id (_id on the db document) property
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
  }
  User.findById(id, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not get by id" });
    } else {
      res.status(200).json(users);
    }
  });
});

// DELETE /users/:id = delete the specified user
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({ error: "Could not get due to invalid/missing id" });
  }
  User.remove({ _id: id }, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: `Error: ${err}` });
    } else {
      res.status(200).json(users);
    }
  });
});

// plumbing
mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server listening on port ${port}`);
}, (err) => {
  console.log('\n********************');
  console.log("Couldn't connect to MongoDB. Do you have it running?");
  console.log('********************\n');
});