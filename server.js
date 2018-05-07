const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose')
const server = express();
const FriendSchema = require('./friends/FriendSchemaa.js');
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', FriendSchema);

mongoose
.connect('mongodb://localhost/friends')
.then(() => console.log('connected'))
.catch(error => console.log(error));

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
