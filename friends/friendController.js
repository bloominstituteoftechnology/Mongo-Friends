const router = require("express").Router();
const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .post((req, res) => {
    const friendData = req.body;
    const friend = new Friend(friendData);
    if (friend.firstName && friend.lastName && friend.age) {
      if (
        typeof friend.age === "number" &&
        friend.age > 0 &&
        friend.age < 121
      ) {
        friend
          .save()
          .then(friend => {
            res.status(201).json(friend);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage:
                "There was an error while saving the friend to the database."
            });
          });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Age must be a number between 1 and 120" });
      }
    } else {
      res.json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    Friend.find()
      .then(friends => {
        const friend = friends.filter(
          friend => friend._id.toString() === id.toString()
        );
        if (friend[0]) {
          res.status(200).json(friend);
        }
        //can't get this to ever display either.
        res.status(404).json(err => {
          message: "The friend with the specified ID does not exist.";
        });
      })
      .catch(err => {
        res.status(500).json(err => {
          errorMessage: "The friend information could not be retrieved.";
        });
      });
  })
  .delete((req, res) => {
    const id = req.params.id;
    Friend.findByIdAndRemove(id)
      .then(friend => {
        if (friend) {
          res.status(204).end();
        } else {
          res.status(404).json({
            // this will only display with ids previously deleted it seems
            message: "The friend with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res.status(500).json(err => {
          errorMessage: "The friend could not be removed";
        })
      );
  })
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const options = {
      new: true
    };
    if (
      !req.body.hasOwnProperty("firstName") ||
      !req.body.hasOwnProperty("lastName") ||
      !req.body.hasOwnProperty("age")
    ) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else if (
      typeof req.body.age !== "number" ||
      req.body.age < 1 ||
      req.body.age > 120
    ) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120" });
    } else {
      Friend.findByIdAndUpdate(id, update, options)
        .then(friend => {
          if (friend) {
            res.status(200).json(friend);
          } else {
            // this  currently won't display if no user with the given id exists so it has to be rewritten
            res.status(404).json(err => {
              message: "The friend with the specified ID does not exist.";
            });
          }
        })
        .catch(err =>
          res.status(500).json(err => {
            errorMessage: "The friend information could not be modified.";
          })
        );
    }
  });

module.exports = router;
