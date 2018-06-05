const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
 const friendController = require('./friends/friendController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
 server.use('/api/friends', friendController);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/bears', {}, (err) => {
  if (err) {
    console.log("Database connection failed");
  }
  else {
    console.log("Successfully Connected to MongoDB");
  }
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
