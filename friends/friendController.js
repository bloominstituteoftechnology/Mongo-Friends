const router = require("express").Router();
const Friend = require("../friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "Error cannot get the friends information"
        });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const friend = new Friend(req.body);

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          "Error First name, last name, and age needed."
      });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => {
          res.status(500).json({
            err: "Error friend is not savedin the database."
          });
        });
    }
 });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        if (res.status(404)) {
          res.json({
            message: "Error ID doesn't exist."
          });
        } else {
          res.status(500).json({
            errorMessage: "Friend information received."
          });
        }
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: "Error the ID is not found!"
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Error the friend was not removed" });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: "Error the ID was not found"
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({
            errorMessage: "Error the friend informations was not updated."
         });
     });
});

module.exports = router;