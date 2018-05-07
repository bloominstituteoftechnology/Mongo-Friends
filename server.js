const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//import mongoose
const mongoose = require('mongoose');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//connect to database
mongoose.connect('mongodb://localhost:frienddb').then(mongo => {
  console.log('connected to database');
}).catch(err => {
  console.log('Error connecting to database', err);
})

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
