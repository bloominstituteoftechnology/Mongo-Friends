const mongoose = require("mongoose");
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const PORT = 3030;

const Friends = require("./models/Friends.js");

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

mongoose
  .connect("mongodb://localhost/mongo-I")
  .then(db => {
    console.log("Now connected to database");
  })
  .catch(err => {
    console.log(`There was an error connecting to database ${err}`);
  });

server.post("/api/friends", (req, res) => {
  const body = req.body;
  const { firstName, lastName, age } = body;
  const friend = new Friends(body);
  friend
    .save()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`Could not listen to ${PORT}`);
  } else {
    console.log(`Now listening on port ${PORT}`);
  }
});
