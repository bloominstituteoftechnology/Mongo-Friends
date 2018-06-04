const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const friendsController =require("./controllers/friendsController");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use("/api/friends", friendsController);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dbFriends", {}, err => {
  if(err) {
    console.log(err);
  } else {
    console.log("Mongoose connected to our friends Db")
  }
});

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
