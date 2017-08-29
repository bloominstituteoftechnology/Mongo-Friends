const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/users.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());



// ROUTES

server.post('/users', (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName ) {
        res.status(500).json({ message: 'You need both a first name and last name!' });
        return;
    }
    const user = new Users(req.body);
    user.save((err) => {
        if (err) throw err;
        res.status(201);
        res.json( { user, message: 'Thank you!' });
    });
});

server.get('/users', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id, (err, user) => {
        if (err) throw err;
        res.json(user);
    });
});






mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
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