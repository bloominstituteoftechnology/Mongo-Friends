const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({errorMessage: 'The friends information could not be retrieved.'})
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(error => {
        res.status(500).json({errorMessage: 'There was an error while saving the friend to the database.'})
      })
  });

  router
    .route('/:id')
    .get((req, res) => {
      res.status(200).json({ route: '/api/friends/' + req.params.id  });
    })
    .delete((req, res) => {
      res.status(200).json({ status: 'please implement DELETE functionality' });
    })
    .post((req, res) => {
      res.status(200).json({ status: 'please implement PUT functionality' });
    });

  module.exports = router;
