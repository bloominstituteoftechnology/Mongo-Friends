const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


console.log(__dirname);
const User = require('../models/users');
const BlogPost = require('../models/blogposts');


const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());


mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/users',
  {useMongoClient: true}
);

server.post('/users', (req, res) => {
  const { name, friends } = req.body;
  if(name) {
    const newUser = new User({ name, friends });
    newUser.save((err, newUser) => {
      if(err) res.status(STATUS_SERVER_ERROR).json(err);
      res.json(newUser);
    })
  } else {
    res.status(STATUS_USER_ERROR).json({error: 'must supply a valid name of length more than 1'});
  }
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json(err);
    }  else {
      res.json(users);
    }
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json(err);
    }  else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json(err);
    }  else {
      res.json(user);
    }
  });
});


/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});