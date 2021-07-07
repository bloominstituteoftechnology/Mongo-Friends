const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendController = require('./friends/friendController')

mongoose
.connect('mongodb://localhost/frienddb')
.then(mongo => {
  console.log('connected to database')
}).catch(err => {
  console.log('error connecting to database', err)
})

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running and running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
 console.log(`\n=== API up on Friends port: ${port} ===\n`)
});
