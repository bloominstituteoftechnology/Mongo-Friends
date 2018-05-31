const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/friendsdb')
  .then(mongo => {
    console.log('connected to database bro!');
  })
  .catch( err => {
    res.status(500).json(err);
    console.log('Error connecting to database bro', err)
  })

const FriendController = require('./friends/FriendController');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', FriendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
