const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendController = require('./friends/friendController.js');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', friendController);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/friends', {}, err => {
  if (err) console.log(err);
  if(!err) console.log(`Mongoose is connected to the DB.`)
})

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
