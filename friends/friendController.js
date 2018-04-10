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
        res.status(500).json({
          errorMessage: 'The friends information could not be retrieved.',
        });
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        res.status(200).json(savedFriend);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            errorMessage: 'The friends information could not be retrieved.',
          });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The friend information could not be retrieved.',
        });
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          res.status(200).json('Friend successfully removed.');
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'The friend could not be removed' });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          Friend.findById(response._id)
            .then(response => {
              if (
                response.age === NaN ||
                response.age < 1 ||
                response.age > 120
              ) {
                res.status(400).json({
                  errorMessage: 'Age must be a number between 1 and 120',
                });
              }
            })
            .catch(err => {
              if (err.name === 'CastError') {
                res.status(400).json({
                  errorMessage: 'Age must be a number between 1 and 120',
                });
              } else {
                res.status(500).json(err);
              }
            });
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            errorMessage: 'Age must be a number between 1 and 120',
          });
        } else {
          res.status(500).json(err);
        }
      });
  });

module.exports = router;
