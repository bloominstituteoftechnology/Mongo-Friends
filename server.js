// server
const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res
    .status(200)
    .json({status: 'API Running'});
});

mongoose
  .connect('mongodb://localhost/FriendsList')
  .then(db => {
    console.log(`Connected to ${db.connections[0].name}`);
  })
  .catch(error => {
    console.log('Failed to connect to the Database');
  })

const port = 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
