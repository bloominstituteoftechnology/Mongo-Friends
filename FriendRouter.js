const express = require("express");

const Friend = require("./FriendSchema.js");

const FriendRouter = express.Router();

FriendRouter.post("/", (request, response) => {
  const friendInfo = request.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Friends require a firstName, lastName, and age"
    });
  } else if (friendInfo.age < 1 || friendInfo.age > 120) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Age must be a whole number between 1 and 120"
    });
  } else {
    const friend = new Friend(friendInfo);
    friend
      .save()
      .then(savedFriend => {
        response.status(201).send(savedFriend);
      })
      .catch(err => {
        response.status(500).send({
          error: "There was an error while saving the friend to the database"
        });
      });
  }
});

FriendRouter.get("/", (request, response) => {
  Friend.find({})
    .then(friends => {
      response.status(200).send(friends);
    })
    .catch(err => {
      response
        .status(500)
        .send({ error: "Error 500! The information could not be retrieved." });
    });
});

FriendRouter.get("/:id", (request, response) => {
  const { id } = request.params;
  Friend.findById(id)
    .then(foundFriend => {
      if (!foundFriend) {
        response
          .status(404)
          .send({ error: "Error 404! No friend with that ID could be found!" });
      } else {
        response.status(200).send(foundFriend);
      }
    })
    .catch(err =>
      response.status(500).send({
        error: "Error 500! Error retrieving the friend from the database."
      })
    );
});

FriendRouter.put("/:id", (request, response) => {
  const { id } = request.params;
  let idIsValid = true;
  const friendInfo = request.body;
  if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Friends require a firstName, lastName, and age"
    });
  } else if (friendInfo.age < 1 || friendInfo.age > 120) {
    response.status(400).send({
      errorMessage:
        "400 Bad Request! Age must be a whole number between 1 and 120"
    });
  } else {
    Friend.findByIdAndUpdate(id, friendInfo)
      .then(updatedFriend => response.status(200).send(updatedFriend))
      .catch(err =>
        response
          .status(404)
          .send({
            errorMessage: "Error 404! No friend with that ID could be found!"
          })
      );
  }
});

FriendRouter.delete("/:id", (request, response) => {
  const { id } = request.params;
  Friend.findByIdAndRemove(id)
    .then(removedFriend => {
      if (!removedFriend) {
        response
          .status(404)
          .send({
            errorMessage: "Error 404! No friend with that ID could be found!"
          });
      } else {
        response.status(200).send(removedFriend);
      }
    })
    .catch(err => {
      response.status(500).send({ error: "The friend could not be removed" });
    });
});

module.exports = FriendRouter;
