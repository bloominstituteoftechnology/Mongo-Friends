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
        res.json({ err });
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
    res.status(200).json({ route: "/api/friends/" + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: "please implement DELETE functionality" });
  })
  .put((req, res) => {
    res.status(200).json({ status: "please implement PUT functionality" });
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
