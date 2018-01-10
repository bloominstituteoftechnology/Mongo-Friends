const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./UserModel.js');

const server = express();

server.use(bodyParser.json());

// endpoints

server.get('/', function(req, res) {
    res.status(200).json({ message: 'API is Running'});
});

server.post('/users', (req, res) => {
    const userInfo = req.body;

    if (!userInfo.name || !userInfo.age) {
        res.status(400).json({errorMesssag: 'Please provide the correct infromation'});
    } else {
        const user = new User(userInfo);

        user.save()
            .then(function(newUser) {
                res.status(201).json(newUser);
            })
            .catch(function(error) {
                res.status(500).json({error: 'user did not save'});
            })
    }
});

server.get('/users', function(req, res) {
    User.find({})
        .then(function(user) {
            res.status(200).json(user);
        })
        .catch(function(error) {
            res.status(500).json({error: 'Could not retrieve user'});
        })
})

server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    User.findById(id)
        .then(function(user) {
            res.status(200).json(user)
        })
        .catch(function(error) {
            res.status(500).json({error: 'there is no id that matches'})
        })
})

server.delete('/users/:id', function(req, res) {
    User.findAndDelete(req.params.id)
    .then(function(user){
        if(user === null)
            res.status(404).json({message:'User Not Found', error:'User Not Found'})
        else
            res.status(200).json(user);
    })
    .catch(function(error) {
        res.status(500).json({message: 'Error deleting id', error});
    })
})

// Plumbing code for DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users', { useMongoClient: true })
    .then(function() {
        server.listen(5000, function() {
        console.log('Database up and Running');
        });
    })
    .catch(function(error) {
        console.log('Database connection failed');
    });