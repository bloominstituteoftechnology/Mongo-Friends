const router = require('express').Router();

const Friend = require('./friendModel.js');

router
  .route('/')

  // Get Friends
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'The friends information could not be retrieved.'
        });
      });
  })

  // Create Friend
  .post((req, res) => {
    const friend = new Friend(req.body);
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.'
      });
    } else if (age < 1 || age > 120) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
    } else {
      friend
        .save()
        .then(savedFriend => {
          res.status(201).json({ savedFriend });
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });

router
  .route('/:id')

  // Get Friend by ID
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
        // 404 not found ???
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'The friend information could not be retrieved.'
        });
      });
  })

  // Delete Friend
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
        // 404 not found ???
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: 'The friend could not be removed' });
      });
  })

  // Update Friend
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const { age, firstName, lastName } = update;

    Friend.findByIdAndUpdate(id, update)
      .then(friend => {
        if (!firstName || !lastName || !age) {
          res.status(400).json({
            errorMessage:
              'Please provide firstName, lastName and age for the friend.'
          });
        } else if (age < 1 || age > 120) {
          res
            .status(400)
            .json({ errorMessage: 'Age must be a number between 1 and 120' });
        } else {
          res.status(200).json(update);
        }
        // 404 not found ???
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'The friend information could not be modified.'
        });
      });
  });

module.exports = router;
