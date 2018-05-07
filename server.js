const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friends')
  .then(mongo => {
    console.log('connected to mongodb!');
  })
  .catch(err => {
    console.log('Error connecting to db');
  });

const friendController = require('./MVR/friendController');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});
server.use('/api/frineds', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
