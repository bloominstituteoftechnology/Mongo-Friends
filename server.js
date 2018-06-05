const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const friendController = require('./friends/friendController');

const server = express();
const db = require('./database.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
