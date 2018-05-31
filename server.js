const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/frienddb').then(mongo => {
  console.log('Connected to database');
}).catch(err => {
  console.log("Error while connecting to database", err);
})

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  // 'running' shows up in browser
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
