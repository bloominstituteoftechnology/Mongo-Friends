const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./User.js')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500; 

const server = express();
server.use(bodyParser.json());

server.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Could not create user' });
    } else {
      // adds user
      res.status(200).json(user);
    }
  })
});
server.get('/api/users', (req, res) => {
  User.find({}, (err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Could not find user'});
    } else {
      res.status(200).json(user);
    }
  });
});
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById({ _id: id }, (err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not find user id"});
    } else {
      res.status(200).json(user);
    }
  });
});
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById({ _id: id }, (err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Could not find user id'});
    } else {
      user.remove();
      res.json({ success: true });
    }
  })
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
)
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server listening on port ${port}`);
}, (err) => {
  console.log(`\n************************`);
  console.log('Error: Could not connect to MongoDB. Check to see if it is running.');
  console.log(`************************\n`);
});
