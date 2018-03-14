const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const friendRouter = require('./src/controllers/friendRouter');
const blogRouter = require('./src/controllers/blogRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.use('/api', friendRouter);
server.use('/api/friends', blogRouter);

server.get('/api', function(req, res) {
  res.status(200).json({ api: 'running...' });
});

mongoose
  .connect('mongodb://localhost/friends')
  .then(conn => {
    console.log('connected to mongo');
  })
  .catch(err => {
    console.log('error connect to mongo');
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`running on port ${port}`));
