const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('./models.js');

const server = express();
server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

server.post('/user', (req, res) => {
  const newUser = new user(req.body);
  newUser.save((err, user) => {
    res.status(200).json(user);
  });
});

server.get('/user', (req, res) => {
  user
    .findById('5a0e1daaa223ed15f8499406')
    .select('nutrients')
    .select('energy')
    .exec(function(err, user) {
      if (err) {
        // handle error
      } else {
        console.log(user.nutrients.water.value);
        res.status(200).json(user);
      }
    });
});

server.get('/user/:id', (req, res) => {
  const { id } = req.params;
  user.findById(id, function(err, user) {
    if (err) {
      // handle error
    } else {
      res.status(200).json(user);
    }
  });
});

server.delete('/user/:username', (req, res) => {
  const { username } = req.params;
  user.find({ username }).remove(function(err, user) {
    if (err) {
      // handle error
    } else {
      res.status(200).json(user);
    }
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/user', {
  useMongoClient: true
});

connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  }
);
