const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendController = require('./friends/friendController');

const server = express();

// connect to database (mongoDB)
mongoose.connect('mongodb://localhost/frienddb'); // db is created upon connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection failed:'));
db.once('open', function () {
  console.log('Successfully Connected to MongoDB') // we're connected!
});

// apply middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
