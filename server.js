const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const friendsRouter = require('./friends/friendsRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use('/api/friends', friendsRouter);

mongoose
  .connect('mongodb://localhost/store')
  .then(() => { console.log('Successfully connected to MongoDB') })
  .catch((err) => { console.log('Connection to MongoDB failed') })


const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log('Server is listening on port ', port);
})

