const router = require('express').Router();

const Friend = require('./friendModel')

router
  .route('/')
  .get(get)
  .post(post)

router
  .route("/:id").get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json(error);
      })
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
    .post()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

module.exports = router;
