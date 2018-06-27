const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Initiate Server
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json())

// Middleware || friendController: router
const friendController = require('./friends/friendController');

// Single Route
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
// Mongo Connection
mongoose.connect('mongodb://localhost/FriendDb', {}, (error) => {
  if(error) console.log(error);
  console.log('Mongoose connected to db');
});

// Inialize Listening
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));