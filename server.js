const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const friendController = require('./friends/friendController');

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.promise;
mongoose.connect(
  "mongodb://localhost/friends", {}, error => {
    if (error) {
      console.log(error);
    }
  }
);

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
