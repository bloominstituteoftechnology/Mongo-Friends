const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const friendRouter = require('./friends/friendRoutes');

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' })
});

server.use('/friends', friendRouter);

mongoose
  .connect('mongodb://localhost/FriendsCollection')
  .then(connect => {
      console.log('Successfully connected to mongo');
  })
  .catch(err => {
      console.log('Error connecting to mongo');
  });

const port = process.env.PORT || 3030;
server.listen(port, () => console.log(`Server listening on port ${port}`));