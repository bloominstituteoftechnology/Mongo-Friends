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
  if (firstName && lastName && age) {
  } else {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName, and age for the friend"
    });
  }
  console.log("age", age);
  if (age > 1 && age < 120) {
    res.status(201).json(body);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Age must be a whole number between 1 and 120" });
  }
  friend
    .save()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was a problem saving friends."
      });
    });
});

server.get("/api/friends", (req, res) => {
  Friends.find()
    .then(savedFriend => {
      res.status(201).json(savedFriend);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
  return;
});

server.get("/api/friends/:id", (req, res) => {
  const id = req.params.id;
  Friends.findById(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res
          .status(500)
          .json({ error: "The information could not be retrieved" });
      }
    })
    .catch(friend => {
      res
        .status(404)
        .json({ message: "The friend with the specified ID does not exist" });
    });
});

server.delete("/api/friends/:id", (req, res) => {
  const id = req.params.id;
  Friends.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(500).json({ error: "The friend could not removed" });
      }
    })
    .catch(friend => {
      res
        .status(404)
        .json({ message: "The friend with the specified ID does not exist" });
    });
});

server.put("/api/friends/:id", (req, res) => {
  const friendBody = req.body;
  const id = req.params.id;
  const { firstName, lastName, age } = friendBody;
  if (age > 1 && age < 120) {
    res.status(201).json(friendBody);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Age must be a whole number between 1 and 120" });
  }
  if (firstName && lastName && age) {
    Friends.findByIdAndUpdate(id, friendBody, { test: true })
      .then(friend => {
        if (friend) {
          res.status(200).json(friend);
        } else {
          res
            .status(500)
            .json({ error: "The information could not be retrieved" });
        }
      })
      .catch(friend => {
        res
          .status(404)
          .json({ message: "The friend with the specified ID does not exist" });
      });
  } else {
    res.status(400).json({
      message: "Please provide firstName,lastName,age for the friend"
    });
  }
});

server.listen(PORT, err => {
  if (err) {
    console.log(`Could not listen to ${PORT}`);
  } else {
    console.log(`Now listening on port ${PORT}`);
  }
});
