const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose')

mongoose
.connect('mongodb://localhost/frienddb')
.then(mongo=>{
  console.log("connected")
})
.then(err=>{
  console.log('error connecting',err)
})

const friendController = reuqire('./friends/friendController')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
