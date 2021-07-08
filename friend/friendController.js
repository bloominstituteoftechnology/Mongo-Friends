const router = require("express").Router();

const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        console.log("There was an error getting friends.");
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    if (req.body.firstName && req.body.lastName && req.body.age) {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => {
          if (err.name === "Validator Error") {
            res.status(400).json(err.message);
          } else {
            res
              .status(500)
              .json({
                errorMessage:
                  "There was an error while saving the friend to the database."
              });
          }
        });
    } else {
      res.status(400).json({
        errorMessage: "Please provide firstName, lastName, and age for friend."
      });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        console.log("There was a problem retrieving friend.");
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: "Friend successfully deleted!" });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error deleting Friend." });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(friend => {
        console.log("Successfully Updated Friend.");
        res.status(201).json(friend);
      })
      .catch(err => {
        console.log("There was a problem updating friend.");
      });
  });

module.exports = router;
