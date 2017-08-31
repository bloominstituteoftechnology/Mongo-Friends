const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// Implement the following routes but have them utilize a database to achieve data persistence.

// * [GET] `/users` This route will return an array of all users.
server.get(('/users'), (req, res) => {
    User.find([], (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});

// * [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
server.get(('/users/:id'), (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});


// * [POST] `/users` This route should save a new user to the server.
server.post(('/users'), (req, res) => {
    const { first, last, birthday } = req.body;
    if (!first || !last || !birthday) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Missing one of the parameters.' });
    }

    const user = new User({ first, last, birthday });
    user.save((err) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(user);
    });
});

// * [DELETE] `/users/:id` This route should delete the specified user.
server.delete(('/users/:id'), (req, res) => {
    const { id } = req.params;
    User.deleteOne(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/user',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
    const port = process.env.PORT || 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
}, (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
});
