const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendController = require('./friendController');

mongoose.connect('mongodb://localhost/friendsdb')
  .then(mongo => console.log('connected to database'))
  .catch(err => console.log(err));

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/friends', friendController);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
