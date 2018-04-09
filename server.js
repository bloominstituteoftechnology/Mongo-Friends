const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongodb = require('mongodb');

mongodb
  .connect('mongodb://localhost/frienddb')
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('error connecting mongo'));

const friendController = require('./friendData/friendController')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
