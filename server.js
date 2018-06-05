const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();
const friendController = require('./Friends/friendController');

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose
	.connect('mongodb://localhost/db')
	.then(mongo => {
		console.log('connected to db');
	})
	.catch(err => {
		console.log('error connecting to the db', err);
	});

server.get('/', (req, res) => {
	res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
