const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

server.get('/', function(req, res) {
    res
    .status(200)
    .json({ status: 'The API is awake!'})
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