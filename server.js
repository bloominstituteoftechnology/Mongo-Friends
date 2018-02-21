const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const Friend = require('./FriendModel.js');

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

server.get('/', function(req, res) {
    res
    .status(200)
    .json({ status: 'The API is awake!'})
});

server.post('/friends', (req, res) => {
    const friendInfo = req.body;
    const friend = new Friend(friendInfo);
    friend
        .save()
        .then(savedFriend => {
            res
            .status(201)
            .json(savedFriend);
        })
        .catch(error => {
            res
            .status(400)
            .json({
                errorMessage: "Please provide firstName, lastName and age for the friend."
            })
        });
});

server.get('/friends', (req, res) => {
    Friend.find()
        .then(friends => {
            res
            .status(200)
            .json(friends);
        })
        .catch(error => {
            res
            .status(400)
            .json({ errorMessage: "All of your friends are gone" });
        });
});

server.get('/friends/:id', (req, res) => {
    const { id } = req.params;
    Friend.findById(id)
        .then(friend => {
            res
            .status(200)
            .json(friend);
        })
        .catch(error => {
            res
            .status(400)
            .json({ errorMessage: `So... we can't find your friend...`})
        });
});

server.delete('/friends/:id', (req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
        .then(() => {
            res
            .status(200)
            .json({ message: 'User has been deleted'})
        })
        .catch(error => {
            res
            .status(400)
            .json({ errorMessage: `User cannot be deleted by this id`});
        });
});

mongoose
        .connect('mongodb://localhost/FriendList')
        .then(db => {
            console.log(`Successfully connected to the ${db.connections[0].name} database`);
        })
        .catch(error => {
            console.log(`Database Connection Failed`);
        });

const port = process.env.PORT || 5005;
server.listen(port, () => {
    console.log(`API running on http://localhost:${port}.`)
});