const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const User = require('./UserModel');

const server = express();

server.use(bodyParser.json());






server.post('/users', function(req, res) {

  const userInfo = req.body;

  if (!userInfo.name) {

    res.status(400).json({
      error: 'Missing `name`, a required field'
    });

  } else {

    const user = new User(userInfo);

    user.save()
      .then(function(newUser) {
        res.status(201).json(newUser);
      })
      .catch(function(error) {
        res.status(400).json({
          error: ''
        });
      });

  }

});

server.get('/users', function(req, res) {
  User.find({})
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(error) {
      res.status(500).json({
        error: ''
      });
    });
});

server.get('/users/:id', function(req, res) {
  const { id } = req.params;

  User.findById(id)
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(error) {
      res.status(500).json({
        error: ''
      });
    });
});

server.delete('/users/:id', function(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(error) {
      res.status(500).json({
        error: ''
      });
    });

});





mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users', { useMongoClient: true })
  .then(function() {

    console.log('Connected to mongodb://localhost/users');

    const port = 5000;

    server.listen(port, function() {
      console.log(`Server running on http://localhost:${ port }`); 
    });

  })
  .catch(function(error) {
    console.error('Error connecting to mongodb://localhost/users');
  });
