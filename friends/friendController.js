const router = require('express').Router();

const Friend = require('./friendModel.js');

router
  .route('/')
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

    Friend.save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => res.status(500).json(err));
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

// people visiting /api/users
module.exports = router;
