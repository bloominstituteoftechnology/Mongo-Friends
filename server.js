const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose'); //One: yarn add dependencies for mongoose and then require it in server

mongoose.connect("mongodb://localhost:27017/frienddb") //Two: connect mongoose to localhost:27017. frienddb is the name of the database we are connecting to
  .then(mongo =>{
    console.log("connected to database")
  }) //console.log successful connection
  .catch(err =>{
    console.log("There was an error in connecting to database")
  }); //console.log unsuccessful connection

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const friendController = require('./friendController');

server.use('/api/friends', friendController);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
