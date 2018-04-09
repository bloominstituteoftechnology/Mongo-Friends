const router = require('express').Router();
const Friend = require('./friendModel');

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
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.'
      });
    } else if (!age === Number || age < 1 || age > 120) {
      res.status(400).json({
        errorMessage: 'Age must be a number between 1 and 120'
      });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json(savedFriend);
        })
        .catch(err => res.status(500).json(err));
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = req.body.id;
    if (!id) {
      res.status(404).json({
        errorMessage: 'The friend with the specified ID does not exist.'
      });
    } else {
      Friend.findById(req.params.id)
        .then(friends => {
          res.status(200).json(friends);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  })

  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
