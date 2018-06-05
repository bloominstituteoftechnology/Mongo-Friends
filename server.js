const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const localHost = 'localhost:27017';
const database = 'frienddb';

mongoose
    .connect(`mongodb://${localHost}/${database}`)
    .then(response => {
        console.log("Connection Successful")
    })
    .catch(error => {
        console.log("Connection Failed")
    });
    
const friendController = require('./friends/friendController.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
