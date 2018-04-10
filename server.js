const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const validator = require('validator');

mongoose
	.connect('mongodb://localhost/frienddb')
	.then(() => console.log('\n=== connected to mongo ===\n'))
	.catch(err => console.log('error connecting to mongo'));

const friendController = require('./friends/friendController');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', friendController);
server.use(validator());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
