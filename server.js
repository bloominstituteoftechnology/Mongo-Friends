const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./Users/UserModel.js');

const server = express();

server.use(bodyParser.json());

server.post('/users', function(req, res) {
  const user = new User(req.body);
  console.log(user);
  user
    .save() // returns a promise
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(error) {
      res.status(500).json({ message: 'Server Error', error })
    });
});

server.get('/users', function(req, res) {
  User.find() // returns all the user documents
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(error) {
      res.status(500).json({ message: 'Server Error', error });
    });
})

server.get('/users/:id', function(req, res) {
  const { id } = req.params; // destructuring

  User.findById(id)
    .then(function(user) {
      if (user === null) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(function(error) {
      if (error.name === 'CastError') {
        res
          .status(500)
          .json({ message: `The id ${error.value} provided is invalid`, error });
      } else {
        res.status(500).json({ message: 'Server Error', error });
      }
    });
});

server.delete('/users/:id', function(req, res) {
  const id = req.params.id; 

  User.findByIdAndRemove(id)
    .then(function(user) {
      res.status(200).json({ message: 'User removed successfully' });
    })
    .catch(function(error) {
      res.status(500).json({ message: 'Server Error', error });
    });
});

server.put('/users/:id', function(req, res) {
  const id = req.params.id; 
  const userInformation = req.body;

  User.findByIdAndUpdate(id, userInformation)
    .then(function(user) {
      res.status(200).json({ message: 'User updated successfully' });
    })
    .catch(function(error) {
      res.status(500).json({ message: 'Server Error', error });
    });
});

server.delete('/users', function(req, res) {
  User.deleteOne(req.body)
    .then(function() {
      console.log('It works!');
      res.status(200).send('Deleted')
    })
    .catch(function() {
      res.status(500).send('Failed')
      console.log('We failed miserably');
    });
});

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/CS5', { useMongoClient: true })
  .then(function(connection) {
    console.log('Database Connected!');
  })
  .catch(function(error) {
    console.error('Error connecting to the Database');
  });

server.listen(5000, function() {
  console.log('Server up');
});
