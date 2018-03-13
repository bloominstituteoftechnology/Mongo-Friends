const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const friendRouter = require('./friends/friendRouter');
const postRouter = require('./friends/postRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser());

server.get('/', (req, res) => {
  res.status(200).send('API Running');
});

server.use('/api/friends', friendRouter);
server.use('/api/posts', postRouter);

mongoose
  .connect('mongodb://localhost/FriendsList')
  .then(res => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed. Error: ', err);
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
