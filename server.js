const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const friendModel = require('./friends/model')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// GET method for initial page
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

// GET method for api/friends
server.get('/api/friends', (req, res) => {

})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
