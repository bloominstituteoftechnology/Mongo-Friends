const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const friendAPI = require('./routes/friendRoutes');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.static(path.join(__dirname, 'client/build')));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/friends', friendAPI);

server.get('*', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/index.html`));
});



mongoose.connect('mongodb://localhost/frienddb');
mongoose.connection.on('connected', () => console.log('=== DB Connection: 200'));
mongoose.connection.on('error', () => console.log('=== DB Connection: 500'));

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
