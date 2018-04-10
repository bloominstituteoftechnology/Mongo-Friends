const router = require('express').Router();

const Friend = require('./friendModel.js');

router
  .route("/")
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);

    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend
    .findById(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "The friend information could not be retrieved." });
      });
  })
  .delete((req, res) => {
    Friend
    .findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: "Friend successfully deleted!" });
      })
      .catch(err => {
        res
          .status(500).json({ errorMessage: "The friend could not be removed" });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "The friend information could not be modified." });
      });
  });

module.exports = router;
