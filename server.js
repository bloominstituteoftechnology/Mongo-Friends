const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendController = require('./friends/friendController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbBears', {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our database.');
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n===== API running on port: ${port} =====\n`)
});