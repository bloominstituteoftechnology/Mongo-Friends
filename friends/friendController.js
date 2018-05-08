const router = require('express').Router();
const mongoose = require('mongoose');

const Friend = require('./friendModel');

router.route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "The friends information could not be retrieved."
        });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    if(!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage: "Please provide firstName, lastName and age for the friend."
      });
    } else if(age < 1 || age > 120) {
      res.status(400).json({
        errorMessage: "Age must be a number between 1 and 120"
      });
    }

    const friend = new Friend(req.body);
    friend.save()
      .then(friend => {
        res.status(201).json(friend);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the friend to the database."
        });
      });
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id)) {
      Friend.findById(id)
        .then(friend => {
          if(friend) res.json(friend);
          else {
            res.status(404).json({
              message: "The friend with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "The friend information could not be retrieved."
          });
        });
    } else {
      res.status(400).json({
        errorMessage: "You must input an id with valid format."
      });
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id)) {
      Friend.findByIdAndRemove(id)
        .then(friend => {
          if(friend) res.json(friend);
          else {
            res.status(404).json({
              message: "The friend with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "The friend information could not be removed."
          }); 
        });
      } else {
        res.status(400).json({
          errorMessage: "You must input an id with valid format."
        });
      }
  })
  .put((req, res) => {
    const { firstName, lastName, age } = req.body;
    if(!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage: "Please provide firstName, lastName and age for the friend."
      });
    } else if(age < 1 || age > 120) {
      res.status(400).json({
        errorMessage: "Age must be a number between 1 and 120"
      });
    }

    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id)) {
      Friend.findByIdAndUpdate(id, req.body, { new: true })
        .then(friend => {
          if(friend) res.json(friend);
          else {
            res.status(404).json({
              message: "The friend with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "The friend information could not be modified."
          }); 
        });
    } else {
      res.status(400).json({
        errorMessage: "You must input an id with valid format."
      });
    }
  });

module.exports = router;