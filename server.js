const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const friendsRouter = require('./friends/friendsRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser());

server.get('/', (req, res) => {
  res.status(200).json({ status: 'API Running ' });
});

server.use('/api/friends');

mongoose
  .connect('mongodb://localhost/FriendsKeeper')
  .then(conn => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed', err);
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
