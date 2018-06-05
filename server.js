const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();

const friendController = require('./friends/friendController');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;// configure the mongoose promise to use Native JS Promises
mongoose.connect('mongodb://localhost/dbFriends', {}, err => {
  // declare where we're going to connect this is the equivilent of using 'use dbBears' int the mongo shell
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB');
});

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
