// mongod
// mongo -> show dbs
// npm i mongoose

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to Mongo
mongoose
  .connect('mongodb://localhost/frienddb')
  .then(mongo => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log('Error Connecting to Database');
  });

// const friend = require('./friends/friend');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ API: 'Running' });
});

// server.use('/api/friends', friend);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API up on port: ${port} ===\n`);
});
