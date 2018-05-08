const router = require('express').Router();

const Friend = require('./friendModel');

router.route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    if(!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage: "Please provide firstName, lastName and age for the friend."
      });
    }

    const friend = new Friend(req.body);
    friend.save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(friend => {
        res.json(friend);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;