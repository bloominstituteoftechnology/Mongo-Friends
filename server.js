const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const friendRouter = require('./friends/friendRouter.js');
const blogPostRouter = require('./blogposts/blogPostRouter.js');

const STATUS_OK = 200;

const server = express();
server.use(helmet());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(STATUS_OK).json({ api: 'Running' });
});

server.use('/friends', friendRouter);
server.use('/friends/:id/blogPost', blogPostRouter);

mongoose
  .connect('mongodb://localhost/friends')
  .then(connection => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error Connecting to MongoDB'));

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running on port ${port}`));
