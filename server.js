const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./model.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here
server.post('/users', function(req, res) {
    const newUser = new User(req.body);

    newUser.save(function(err, user) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({error: "Could not create server"});
        } else {
            res.status(200).json(user);
        }
    });
});

server.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            //handle error
            res.status(STATUS_SERVER_ERROR).json({error: "Could not retrieve users"});
        } else {
            res.status(200).json(users);
        }
    })
});

server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    User.findById({__id: id}, function(err, users) {
        if (err) {
            //handle error
            res.status(STATUS_USER_ERROR).json({error: "Could not find id"});
        } else {
            res.status(200).json(users)
        }
    })
});

server.delete('/users/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, users) {
        if (err) {
            res.status(STATUS_USER_ERROR).json({error: "Could not find id to remove"});
        } else {
            res.status(200).json(users);
        }
    });
});


// plumbing
mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/servers',
  { useMongoClient: true }
);

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
