const express = require("express");

const Friend = require("./FriendModel");

const friendsRouter = express.Router();

friendsRouter.post("/", (req, res) => {
  const friendInfo = req.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    res.status(400).json({
      errorMessage: `Please provide firstName, lastName and age for the friend.`,
    });
  }
  if (friendInfo.age < 1 || friendInfo.age > 120) {
    res.status(400).json({
      errorMessage: `Age must be a whole number between 1 and 120`,
    });
  }
  const friend = new Friend(friendInfo);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friendInfo);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the friend to the database.",
        error: err,
      });
    });
});

friendsRouter.get("/", (req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved.",
      });
    });
});

friendsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  Friend.findById(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({
          message: "The friend with the specified ID does not exist.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The information could not be retrieved.",
      });
    });
});

friendsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({
          message: "The friend with the specified ID does not exist.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The friend could not be removed.",
      });
    });
});

friendsRouter.put("/:id", (req, res) => {
  const updatedInfo = req.body;
  const { id } = req.params;
  if (!updatedInfo.firstName || !updatedInfo.lastName || !updatedInfo.age) {
    res.status(400).json({
      errorMessage: `Please provide firstName, lastName and age for the friend.`,
    });
  }
  if (updatedInfo.age < 1 || updatedInfo.age > 120) {
    res.status(400).json({
      errorMessage: `Age must be a whole number between 1 and 120`,
    });
  }
  Friend.findByIdAndUpdate(id, updatedInfo)
    .then(friend => {
      if (friend) {
        res.status(201).json(updatedInfo);
      } else {
        res.status(404).json({
          errorMessage: "The friend with the specified ID does not exist",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The friend information could not be modified.",
        error: err,
      });
    });
});

module.exports = friendsRouter;
