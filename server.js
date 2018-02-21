const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const Friend = require("./Friend/FriendModel");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/friends", (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

app.post("/api/friends", (req, res) => {
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage: "Please provide firstName, lastName and age for the friend."
    });
  } else if (Number(age) > 120 || Number(age) < 1) {
    res
      .status(400)
      .json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(newFriend => {
        res.status(201).json(newFriend);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the friend to the database"
        });
      });
  }
});

app.get("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  Friend.find({ _id: id })
    .then(friend => {
      if (!friend.length) {
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      } else {
        res.status(200).json(friend);
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The friend with the specified ID does not exist." });
    });
});

app.delete("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend === null) {
        res.status(404).json({
          message: "The friend with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ message: "Friend Successfully deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The friend could not be removed" });
    });
});

app.put("/api/friends/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  if (!id) {
    res.status(400).json({ error: "You must include an id in the put url." });
  } else {
    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else if (Number(age) > 120 || Number(age) < 1) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a whole number between 1 and 120" });
    } else {
      Friend.findByIdAndUpdate(id, req.body)
        .then(updatedFriend => {
          res.status(200).json(updatedFriend);
        })
        .catch(err => {
          if (err.name === "CastError") {
            res.status(404).send({
              message: "The friend with the specified ID does not exist."
            });
          } else {
            res
              .status(500)
              .json({ error: "The friend information could not be modified." });
          }
        });
    }
  }
});

mongoose
  .connect("mongodb://localhost/friends")
  .then(db => {
    console.log(
      `Successfully connected to the ${db.connections[0].name} database`
    );
  })
  .catch(err => {
    console.error("Error connecting to the database");
  });

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
