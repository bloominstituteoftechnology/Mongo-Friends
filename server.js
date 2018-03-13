const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const friendRouter = require('./friends/friendRoutes');
const fakeBookPostsRouter = require('./blogPosts/blogPostRoutes');

const server = express();

server.use(helmet())
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running...' })
});

server.use('/api/friends', friendRouter);
server.use('/api/blogPosts', fakeBookPostsRouter);

mongoose
  .connect('mongodb://localhost/FakeBook')
  .then(conn => {
    console.log('Connected to Mongo.');
  })
  .catch(err => {
    console.error('Error connecting to Mongo.');
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`running on port ${port}`));
