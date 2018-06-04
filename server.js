const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendAPI = require('./friendRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', friendAPI);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/frienddb');
mongoose.connection.on('connected', () => console.log('=== DB Connection: 200'));
mongoose.connection.on('error', () => console.log('=== DB Connection: 500'));

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
