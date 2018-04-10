const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find({}).limit(10)
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(err => {
        res.status(500).json({errorMessage: 'The friends information could not be retrieved.'});
      })
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend.save()
      .then(savedFriend => {
        if(age < 1 || age > 120) {
          res.status(400).json({ error: "Age must be a number between 1 and 120"})
        } else {
          res.status(201).json(savedFriend);
        }
      })
    .catch(err => 
      res.status(500).json(err))
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({errorMessage: 'The friend information could not be retrieved.'})
      })
    })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
    .then(friends => {
      if(friends === null) {
        res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.'})
      } else {
        res.status(200).json(friends);
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'The friend could not be removed', err})
    })
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
    .then(friends => {
      if(friends === null) {
        res.status(404).json({ errorMessage: 'The friend with the specified ID does not exist.'})
      } else {
        res.status(200).json(friends);
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: 'The friend could not be updated',})
    })
  });

module.exports = router;