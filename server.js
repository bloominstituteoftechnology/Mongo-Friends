const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const friendsRouter = require('./friends/friendsRouter');

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ status: 'API Running' });
});

server.use('/api/friends', friendsRouter);

mongoose
    .connect(`mongodb://localhost/api`)
    .then(conn => {
        console.log(`Connected to Mongo`);
    })
    .catch(err => {
        console.log(`Error: Connect to Mongo`);
    })

const port = process.env.PORT || 5005;
server.listen(port, () => {
    console.log(`API running on http://localhost:${port}.`);
});
