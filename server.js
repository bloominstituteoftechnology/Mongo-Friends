const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());
mongoose.connect('mongodb://localhost/', { useMongoClient: true });
const { User } = require('./models');

server.post('/users', (req, res) => {
    const { userName } = req.body;
    const newUser = new User ({ userName });
    newUser.save(newUser, (err, user) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'There has been a save error' });
            return;
        } else {
            res.json({ user });
        }
    });
});

server.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (!err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'User not found' });
            return;
        } else {
            res.json({ users });
        }
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'We could not find a user with that id' });
            return;
        } else {
            res.json({ user });
        }
    });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Could not delete a user with that id' });
            return;
        } else {
            res.json({ deleted });
        }
    });
});

mongoose.Promise = global.Promise;



server.listen(3000);