// Express
const router = require('express').Router();

// Model
const Friend = require('./friendsModel');

// endpoint /api/friends

// !! Todos or Qs

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then((friends) => {
        res.status(200).json(friends);
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage: 'The friends information could not be retrieved.',
        });
      });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);

    friend
      .save()
      .then((savedFriend) => {
        res.status(201).json(savedFriend); // !! Is this the document type?
      })
      .catch((err) => {
        console.log('err.name', err.name);
        if (err.name === 'ValidationError') {
          let { age, firstName, lastName } = err.errors;

          age = 'age' in err.errors ? age.message : '';
          firstName = 'firstName' in err.errors ? firstName.message : '';
          lastName = 'lastName' in err.errors ? lastName.message : '';
          res.status(400).json({
            age,
            firstName,
            lastName,
          });
        } else {
          res.status(500).json({
            errorMessage:
              'There was an error while saving the friend to the database.',
          });
        }
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then((friend) => {
        if (friend !== null) {
          return res.status(200).json(friend);
        } else {
          return res
            .status(404)
            .json(
              `The friend with the specified ID: ${
                req.params.id
              } does not exist.`
            );
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(400).json(err.message);
        }
        res.status(500).json({
          errorMessage: 'The friend information could not be retrieved.',
        });
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then((response) => {
        if (response === null) {
          res
            .status(404)
            .json(
              `Cannot delete friend with the specified ID: ${req.params.id}.`
            );
        } else {
          res.status(200).json(response);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(400).json(err.message);
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The friend could not be removed' });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn: new Date()};
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then((response) => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res
            .status(400)
            .json(
              `The ID: ${
                req.params.id
              } provided is invalid, please check and try again.`
            );
        } else {
          res.status(500).json({ errorMessage: 'friend couldnot be updated' });
        }
      });
  });
module.exports = router;

// In post if statement: added logic if age !== Number
// In get ('/:id'): added if/else logic
// In post, get ('/'), get ('/:id): changed err res.json() message
