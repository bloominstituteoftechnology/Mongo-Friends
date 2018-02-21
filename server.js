const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Friend = require("./Friends/FriendModel");

const server = express();

server.use(bodyParser.json());

server.post("/api/friends", (req, res) => {
  const friendInfo = req.body;
  const { firstName, lastName, age } = req.body;

  if (firstName && lastName && age) {
    const friend = new Friend(friendInfo);
    friend
      .save()
      .then(savedFriend => {
        res.status(201).send(savedFriend);
      })
      .catch(error => {
        res.status(500).send({
          error: "There was an error while saving the friend to the database"
        });
      });
  } else if (typeof age !== "number" || age < 1 || age > 120) {
    res
      .status(400)
      .send({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    res
      .status(400)
      .send({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
  }
});

server.get("/api/friends", (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).send(friends);
    }).catch(error => {
      res.status(500).send({ error: "The information could not be retrieved." });
    })
});

server.get("/api/friends/:id", (req, res) => {
  const id = req.params.id;

  Friend.findById(id)
    .then(friend => {
      if (friend === null) {
        res.status(404).send({ message: "The friend with the specified ID does not exist." });
      } else {
        res.status(200).send(friend);
      }
    }).catch(error => {
      res.status(500).send({ error: "The information could not be retrieved." });
    })
})

server.delete("/api/friends/:id", (req, res) => {
  const id = req.params.id;

  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend === null) {
        res.status(404).send({ message: "The friend with the specified ID does not exist." });
      } else {
        res.status(200).send(friend);
      }
    }).catch(error => {
      res.status(500).send({ error: "The friend could not be removed" });
    })
})

server.put("/api/friends/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const { firstName, lastName, age } = req.body;

  if(!firstName || !lastName || !age) {
    res.status(400).send({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else if (typeof age !== 'number' || age < 1 || age > 120) {
    res.status(400).send({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    Friend.findByIdAndUpdate(id, update, { new: true })
      .then(friend => {
        if (friend === null) {
          res.status(404).send({ message: "The friend with the specified ID does not exist." });
        } else {
          console.log(friend);
          res.status(200).send(friend);
        }
      }).catch(error => {
        res.status(500).send({ error: "The friend information could not be modified." });
      })
  }
})

mongoose
  .connect("mongodb://localhost/FriendsList")
  .then(db => {
    console.log(
      `Successfully connected to the ${db.connections[0].name} database.`
    );
  })
  .catch(error => {
    console.log("Database Connection Failed");
  });

server.listen(5000, () => {
  console.log("API is running on http://localhost:5000.");
});
