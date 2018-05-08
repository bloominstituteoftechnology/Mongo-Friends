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
    const id = req.params.id;
    Friend.find()
      .then(friends => {
        const friend = friends.filter(
          friend => friend._id.toString() === id.toString()
        );
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const id = req.params.id;
    Friend.findByIdAndRemove(id)
      .then(friend => {
        if (friend) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: "Friend not found" });
        }
      })
      .catch(err => res.status(500).json(err));
  })
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const options = {
      new: true
    };
    Friend.findByIdAndUpdate(id, update, options)
      .then(friend => {
        if (friend) {
          res.status(200).json(friend);
        } else {
          res.status(404).json({ msg: "Friend not found" });
        }
      })
      .catch(err => res.status(500).json(err));
  });

// function get(req, res) {
//   Friend.find().then(friends => {
//     res.status(200).json(friends);
//   });
// }

// function post(req, res) {
//   const friendData = req.body;

//   const friend = new Friend(friendData);

//   friend
//     .save()
//     .then(friend => {
//       res.status(201).json(friend);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// }

module.exports = router;
