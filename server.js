const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/friendDB')
  .then(console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('error connecting to mongo database'));

const friendController = require('./friend/friendController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
