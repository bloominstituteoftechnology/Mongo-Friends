const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('./UserModel.js')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());



mongoose.Promise = global.Promise
mongoose
.connect('mongodb://localhost:27017/user', { useMongoClient: true })
.then(function(db){
    console.log('All your databases are belong to us!')
})
.catch(function(err) {
    console.log('Database connection failed', err.message);
})

server.get('/api/user', function(req, res) {
    user.find({}, function(err, user) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "Deathstar aftermath... server is gone... try again"})
        } else {
            res.status(200).json(user)
        }
    });
});

server.get('/api/user/:id', function(req, res) {
    const { id } = req.params;
    user.findById(id, function(err, user) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "Deathstar aftermath... server is gone... try again this is not the username you were looking for"})
        } else {
            res.status(200).json(user)
        }
    });
});
server.delete('/api/user/:id', function(req, res) {
    const { id } = req.params;
    user.findByIdAndRemove(id, function(err, user) {
        if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "The Deathstar has failed, user still exists; Rogue Squadron 1, Deathstar 0"})
        } else {
            res.status(200).json(user)
        }
    });
});

server.post('/api/user', function(req, res) {
    const newUser = new user(req.body);

    newUser.save(function(err, user) {
        if(err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "cannot comply, resistance is futile; give up, the server... it's gone"})
        } else {
            res.status(200).json(user)
        }
    });
});

const port = 1985;
server.listen(port, function() {
   console.log('server running on port 1985');
});

