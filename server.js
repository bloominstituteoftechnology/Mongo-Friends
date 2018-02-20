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
            .status(500)
            .json({
                error: 'An error has occured saving the Friend to the Database'
            })
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