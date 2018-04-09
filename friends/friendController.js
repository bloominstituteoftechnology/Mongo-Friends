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
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json({ savedFriend });
      })
      .catch(err => res.status(500).json(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => res.status(200).json(friend))
      .catch(err => res.status(500).json(err));
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => res.status(200).json(friend))
      .catch(err => res.status(500).json(err));
  })
  .put((req, res) => {
    const friend = new Friend(req.body);
    Friend.findByIdAndUpdate(req.params.id, friend)
      .then(friend => res.status(201).json(friend))
      .catch(err => res.status(500).json(err));
    res.status(200).json({ status: "please implement PUT functionality" });
  });

module.exports = router;
