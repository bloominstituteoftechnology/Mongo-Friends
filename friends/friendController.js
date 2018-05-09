const router = require("express").Router();
const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find().then(friends => {
      res.status(200).json(friends);
    });
  })
  
  .post((req, res) => {
    const friendData = req.body;
    const friend = new Friend (friendData);
    friend
      .save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router
  .route("/:id")

  .get((req, res) => {
    res.status(200).json({ route: "/api/friends/" + req.params.id });
  })

  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id).then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: "friend not found" });
      }
    });
  })

  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const options = {
      new: true
    };
    Friend.findByIdAndUpdate(id, update, options).then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: "friend not found" });
      }
    });
  });

module.exports = router;
