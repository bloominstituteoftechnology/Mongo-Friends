const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();
const friendRouter = require('./friends/FriendRoutes.js');
const blogRouter = require('./blog/BlogRoutes.js');

server.use(helmet()); 
server.use(cors());  
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.use('/api/friends', friendRouter);
server.use('/api/blog', blogRouter);

mongoose
  .connect('mongodb://localhost/friends')
  .then(conn => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed');
  });


const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
  