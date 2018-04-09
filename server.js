const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const server = express();

const friendRouter = require('./friends/friendRouter.js');

mongoose
  .connect('mongodb://localhost/friends')
  .then(() => console.log('\n=== connected to mongo ====\n'))
  .catch(error => console.log('\n=== error connecting to mongo ===\n'));

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/friends', friendRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
