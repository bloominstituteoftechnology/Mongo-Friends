const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const friendsRouter = require('./friendRoutes');
const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get('/', function (req, res) {
    res.status(200).json({ api: 'running...' });
});

server.use('/api/friends', friendsRouter);

mongoose
    .connect('mongodb://localhost/friendStore')
    .then(conn => {
        console.log('connected to mongo');
    })
    .catch(err => {
        console.log('error connect to mongo');
    });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`running on port ${port}`));
