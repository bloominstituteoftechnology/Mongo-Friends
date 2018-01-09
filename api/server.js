const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./Users/UserModel.js');

const server = express();

server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ message: 'API running' });
});

server.post('/api/users', (req, res) => {
  const userInformation = req.body;

  if (userInformation.name) {
    const user = new User(userInformation);

    user
      .save() // returns a promise
      .then(function(newUser) {
        res.status(201).json(newUser);
      })
      .catch(function(error) {
        res.status(500).json({
          error: 'There was an error while saving the User to the Database',
        });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide Name for the User.',
    });
  }
});
//displays a list of users
server.get('/api/users', function(req, res) {
  User.find({})
  .then(function(users) {
      res.status(200).json(users);
    }).catch(function(error) {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});
//gets a user with id
server.get('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.findById(id)
    .then(function(user) {
      res.
      status(200).json(user);
    }).catch(function(error) {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});
server.delete('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.remove(id) 
    .then(function(user) {
      res.json({ message: 'Successfully deleted' });
    }) .catch(function(error) {
      res.status(500).json({ error: 'We encountered an internal error. Please try again.' });
    });
});

// db related plumbing code
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then(function() {
    server.listen(5000, function() {
      console.log('All your databases are belong to us!');
    });
  })
  .catch(function(error) {
    console.log('Database connection failed');
  });
