const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const friendRouters = require('./Friends/friendRouters');
const Friends = require('./Friends/FriendModel');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendRouters);

mongoose
  .connect('mongodb://localhost/Friends')
  .then(connected => {
    console.log('We Got Mongo Baby! :)');
  })
  .catch(err => {
    console.log('We DONT got Mongo Baby :(');
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
