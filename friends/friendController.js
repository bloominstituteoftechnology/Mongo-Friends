const router = require('express').Router();
const Joi = require('joi');

const Friend = require('./friendModel');

const schema1 = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
};

const schema2 = {
  age: Joi.number()
    .min(1)
    .max(120)
    .required(),
};

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
    let result = Joi.validate(req.body, schema1);
    if (result.error) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.',
      });
      return;
    }
    result = Joi.validate(req.body, schema2);
    if (result.error) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
      return;
    }

    const friend = new Friend(req.body);
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json({ savedFriend });
      })
      .catch(err =>
        res.status(500).json({
          errorMessage:
            'There was an error while saving the friend to the database.',
        })
      );
  });

router
  .route('/:id')
  .get((req, res) => {
    let friendExist = false;

    Friend.find({})
      .then(friends => {
        friends.forEach(friend => {
          if (friend.id === req.params.id) friendExist = true;
        });
        if (!friendExist) {
          res.status(404).json({
            message: 'The friend with the specified ID does not exist.',
          });
        } else {
          Friend.findById(req.params.id)
            .then(friend => res.status(200).json(friend))
            .catch(err => {
              res.status(500).json({
                errorMessage: 'The friend information could not be retrieved.',
              });
            });
        }
      })
      .catch(err =>
        res.status(500).json({
          errorMessage: 'The friend information could not be retrieved.',
        })
      );
  })
  .delete((req, res) => {
    let friendExist = false;

    Friend.find({}).then(friends => {
      friends.forEach(friend => {
        if (friend.id === req.params.id) friendExist = true;
      });
      if (!friendExist) {
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
      } else {
        Friend.findByIdAndRemove(req.params.id)
          .then(friend => res.status(200).json(friend))
          .catch(err =>
            res
              .status(500)
              .json({ errorMessage: 'The friend could not be removed' })
          );
      }
    });
  })
  .put((req, res) => {
    let result = Joi.validate(req.body, schema1);
    if (result.error) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.',
      });
      return;
    }
    result = Joi.validate(req.body, schema2);
    if (result.error) {
      res
        .status(400)
        .json({ errorMessage: 'Age must be a number between 1 and 120' });
      return;
    }

    let friendExist = false;

    Friend.find({}).then(friends => {
      friends.forEach(friend => {
        if (friend.id === req.params.id) friendExist = true;
      });
      if (!friendExist) {
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.',
        });
      } else {
        const friend = new Friend(req.body);
        Friend.findByIdAndUpdate(req.params.id, friend)
          .then(friend => res.status(201).json(friend))
          .catch(err => res.status(500).json(err));
      }
    });
  });

module.exports = router;
