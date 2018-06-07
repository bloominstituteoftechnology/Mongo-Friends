const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendController = require('./friends/friendController.js');
const localHost = 'localhost:27017';
const database = 'frienddb';
const server = express();
const port = process.env.PORT || 5000;

mongoose
    .connect(`mongodb://${localHost}/${database}`)
    .then(response => {
        console.log("Connection Successful")
    })
    .catch(error => {
        console.log("Connection Failed")
    });

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', friendController);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
