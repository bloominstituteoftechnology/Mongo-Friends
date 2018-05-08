const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendsController = require('./friends/friendsController');

mongoose.connect('mongodb://127.0.0.1:27017/firends').then(mongo => {
  console.log("connected to database");
}).catch(err => {
  console.log("error connecting to database", err);
});

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'rennen' });
});

server.use('/api/friends', friendsController);

const port = process.env.PORT || 666;
server.listen(port, () => console.log(`\n=== API rennen auf: ${port} ===\n`));
