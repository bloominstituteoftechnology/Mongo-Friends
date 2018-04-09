const router = require('express').Router();

const Friend = require('./friendModel.js');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(err => {
        res.status(500).json(err);
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
        res.status(500).json(err);
      });
  });
  

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  });
  
  module.exports = router;