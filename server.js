const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017')
  .then(()=>console.log("Successfully conected!"))
  .catch(error=>console.log("Error conecting to the mongo database"));

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n===we are running on API up on port: ${port} ===\n`));
