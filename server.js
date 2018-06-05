const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

/**
 * SET UP: Connection to MongoDB && define 'database' to use.
 */
const mongoose = require('mongoose');
const db_name = 'friends';
const routerFriends = require('./friends/friends.router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', routerFriends);

mongoose.connect(
  `mongodb://localhost/${db_name}`,
  (err, success) => {
    err ? console.error({ err }) : console.log('Success: We are connected to MongoDB!');
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
