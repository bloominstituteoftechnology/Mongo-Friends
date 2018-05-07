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

function post (req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);

    friend
    .save(friendData)
    .then(friend => {
      res.status(201).json(friend)
    })
    .catch(err => {
      res.status(500).json({ Error: err })
    });
  }

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
            errorMessage: 'The friend with the specified ID does not exist.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The friend could not be removed' });
        }
      });
  })


.put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' })
})

module.exports = router;
