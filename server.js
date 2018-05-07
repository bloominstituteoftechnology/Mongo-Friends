const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friebdDb')
  .then(mongo => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('error connecting to database', err);
  });

const friendController = require('./friends/friendController');

const server = express();

errorHandler = (err, req, res, next) => {
  if (err) {
      if (err.errno === 19) {
          res.status(400).json({ msg: 'Please provide all required fields' });
      } else {
          res.status(500).json({ error: 'something bad happened' });
      }
  }
}

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

server.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
