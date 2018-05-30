const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/frienddb')
  .then(connection => {
    console.log('Connected to MongoDB.');
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err);
  })

const friendRouter = require('./Friends/friendRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
