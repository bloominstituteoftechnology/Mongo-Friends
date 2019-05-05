// Express
const express = require('express');
// Middleware
const helmet = require('helmet');
const cors = require('cors');
// Mongoose
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/frienddb')
  .then(() => console.log('\n=== Connected to mongo === \n'))
  .catch((err) => console.log('Error connecting to mongo'));

// Controller
const friendsController = require('./friends/friendsController');

// Server
const server = express();

// Use Middleware
server.use(helmet()); // security
server.use(cors()); // http request access
server.use(express.json()); // parser

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

// Use Controller
server.use('/api/friends', friendsController);

// Connect server to port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
