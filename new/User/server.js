const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./Users/UserModel.js');

const server = express();

server.use(bodyParser.json());

server.post('/users', function(req, res) {
    const user = new User(req.body);
    res.send('worked');
    user
    .save()
    .then(function(user) {
        res.status(200).json(user);
    })
    .catch(function(error) {
        res.status(500).json({ message: 'Server Error', error});
    });
});


server.get('/users', function(req, res) {
    User.find() // all the user documents
     .then(function(users) {
        res.status(200).json(users);
     })
     .catch(function(error) {
         res.status(500).json({ message: 'Server Error', error });
     });
     })

     mongoose.Promise=  global.Promise;