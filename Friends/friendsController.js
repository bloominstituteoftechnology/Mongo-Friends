const router = require("express").Router();
const Friends = require("./friendsModel");

router
  .route("/")
  .get((req, res) => {
    Friends.find()
      .then(friends => {
        res.json({ friends });
      })
      .catch(error => {
        res
          .status(500)
          .json({
            errorMessage: "The friends information could not be retrieved."
          });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friends({ firstName, lastName, age });
    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Please provide firstName, lastName and age for the friend."
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: "Age must be a number between 1 and 120." });
    } else {
      newFriend
        .save()
        .then(friend => {
          res.status(201).json({ friend });
        })
        .catch(error => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the friend to the database."
          });
        });
    }
  });

module.exports = router;
