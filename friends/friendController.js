const router = require('express').Router();

const Friend = require('./friendModel');

router
.route('/')
.get(get)
.post(post);

function get(req, res) {
    Friend.find({})
    .then(friends => {res.status(200).json(friends)})
}

function post(req, res) {
        const friend = new Friend(req.body);
        const { firstName, lastName, age } = req.body;
    
        if (!firstName || !lastName || !age) {
          res.status(400).json({
            message:
              'Please provide firstName, lastName and age for the friend.'
          });
        } else if (!age === Number || age < 1 || age > 120) {
          res.status(400).json({
            message: 'Age must be a number between 1 and 120'
          });
        } else {
          friend
            .save()
            .then(savedFriend => {
              res.status(201).json(savedFriend);
            })
            .catch(err =>
              res.status(500).json({
                message:
                  'There was an error while saving the friend to the database.'
              })
            );
        }
      };

router
.route('/:id')
.get((req, res) => {
    const id = req.params.id;
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
          res.status(500).json({
            errorMessage:
              'There was an error while saving the friend to the database.'
          });
        });
    }
  })

  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(deleteFriend => {
        res.status(200).json(deleteFriend);
      })
      .catch(err => {
        if (res.status(404)) {
          res.json({
            message: 'The friend with the specified ID does not exist.'
          });
        } else {
          res
            .status(500)
            .json({ message: 'The friend could not be removed' });
        }
      });
  })
  
.put((req, res) => {
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      res.status(400).json({
        errorMessage:
          'Please provide firstName, lastName and age for the friend.'
      });
    } else {
      Friend.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedFriend => {
          res.status(201).json(updatedFriend);
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: 'The friend information could not be modified.'
          });
        });
    }
  });

module.exports = router;
