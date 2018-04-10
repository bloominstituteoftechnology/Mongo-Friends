const express = require('express');
const router = express.Router();
const Friend = require('./friendModel.js');

// GET
router.get('/', (req, res) => {
  Friend.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//GET :ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({
          message: 'The friend with the specified ID does not exist.'
        });
      } else {
        res.status(200).json(friend);
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'The friend information could not be retrieved.'
      });
    });
});

// POST
router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body; //destructure to make easier to type
  if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage: 'Please provide firstName, lastName and age for the friend.'
    });
  }
  if (typeof age === 'number') {
    res
      .status(400)
      .json({ errorMessage: 'Age must be a number between 1 and 120' });
  } else {
    const friend = new Friend(req.body); // making new instance of Friend model so save() works
    friend
      .save()
      .then(newFriend => {
        res.status(201).json(newFriend);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the friend to the database.'
        });
      });
  }
});

//DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//PUT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  if (!id) {
    res
      .status(404)
      .json({ message: 'The friend with the specified ID does not exist.' });
  }
  if (!firstName || !lastName || !age) {
    res.status(400).json({
      errorMessage: 'Please provide firstName, lastName and age for the friend.'
    });
  } else {
    Friend.findByIdAndUpdate(id, req.body, { new: true })
      .then(update => {
        res.status(200).json(update);
      })
      .catch(error => {
        res
          .status(500)
          .json({
            errorMessage: 'The friend information could not be modified.'
          });
      });
  }
});
//********remember to export right after imports*********
module.exports = router;
