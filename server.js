const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const friendRouter = require('./Friends/FriendRoutes');

const server = express();

server.use(cors());
server.use(helmet());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ message: `Your Shit Ain't Fucked Up`});
});

server.use('/api/friends', friendRouter);

mongoose
  .connect('mongodb://localhost/FriendKeeper')
  .then(conn => {
    console.log('Connected to Mongo');
  })
  .catch(err => {
    console.log('Mongo doesnt want anything to do with you');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
