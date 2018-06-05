const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendController = require('./friends/friendController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.json({ api: 'running' });
});

server.use('/api/friends', friendController);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbFriends', {}, error => {
  if (error) console.log("Database connection failed");
  else console.log("Successfully Connected to MongoDB");
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
