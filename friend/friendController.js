const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then((friends) => {
        res.status(200).json(friends);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    const {
      firstName,
      lastName,
      age
    } = req.body;
    if (!firstName || !lastName || !age)
      return res.status(400).json({
        errorMessage: 'Please provide firstName, lastName and age for the friend.',
      });
    if (isNaN(age) || age < 1 || age > 120)
      return res
        .status(400)
        .json({
          errorMessage: 'Age must be a number between 1 and 120'
        });
    Friend.save()
      .then((savedFriend) => {
        res.status(201).json(savedFriend);
      })
      .catch((err) => res.status(500).json(err));
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then((friends) => {
        if (!friends) return res.status(404).json({
          message: 'not found'
        });
        console.log(friends);
        res.status(200).json(friends);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .delete((req, res) => {
    const {
      id
    } = req.params;
    Friend.findByIdAndRemove(id)
      .then((response) => {
        if (!response) return res.status(404).json({
          message: 'not found'
        });
        res.status(200).json(response);
      })
      .catch((err) => {
        if (err.name === 'CastError')
          return res
            .status(400)
            .json({
              message: 'the id is invalid, try again'
            });
        res.json(500).json({
          errorMessage: 'the friend could not be deleted'
        });
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then((response) => {
        if (response === null) {
          res.status(404).json({
            message: 'not found'
          });
        } else {
          res.status(200).json(response);
        }
      })
      .catch((err) => {
        if (err.name === 'Cast Error') {
          res.status(400).json({
            message: 'the id is invalid, try again'
          });
        } else {
          res
            .json(500)
            .json({
              errorMessage: 'the friend could not be deleted',
              err
            });
        }
      });
  });

module.exports = router;