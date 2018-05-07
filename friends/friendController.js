const router = require("express").Router();

const Friend = require("./friendModel");

// get and post for general requests
router
  .route("/")
  .get(get)
  .post(post);

// get, delete, and put for ID-specific requests
router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const friendData = req.body;
    Friend.findByIdAndUpdate(id, friendData)
      .then(response => {
        if (response === null) {
          res
            .status(404)
            .json({ message: "friend is not found. Get a friend first." });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === "CastError") {
          res.status(400).json({
            message: "invalid ID, check and try again."
          });
        }
        res.status(500).json(err);
      });
  });

function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  });
}

function post(req, res) {
  const friendData = req.body;
  const friend = new Friend(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      if (
        friend.firstName === undefined ||
        friend.lastName === undefined ||
        friend.age === undefined
      ) {
        res.status(400).json({
          errorMessage:
            "Please provide firstName, lastName and age for the friend."
        });
      } else {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the friend to the database.",
          err
        });
      }
    });
}

module.exports = router;
