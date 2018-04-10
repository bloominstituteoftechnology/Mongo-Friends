const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cs8')
.then(() => console.log('\n===connected to mongo===\n'))
.catch(err =>console.log('not connected'))

const friendsRouter = require('./friends/friendsRouter');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendsRouter);

const port = process.env.PORT || 5003;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
