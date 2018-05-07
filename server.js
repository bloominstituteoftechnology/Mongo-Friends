const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/friends')
  .then(mongo => console.log("connected to the database"))
  .catch(err => console.log("error connecting to the database"));

const friendsController = require('./friends/friendsSchema');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => { res.status(200).json({ api: 'running' }) });

server.use('/api/friends', friendsController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
