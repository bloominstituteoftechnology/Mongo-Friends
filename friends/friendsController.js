const router = require('express').Router();

const Friend = require('./friendsModels');

// api/friends

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

    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => res.status(500).json(err));
  });
router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.'
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          // I can't remember what CastError is?
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The friend could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The friend could not be removed', err });
        }
      });
  });

module.exports = router;
