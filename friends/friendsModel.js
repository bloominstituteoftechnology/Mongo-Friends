const router = require('express').Router();
const Friend = require('./friendsModel');

router
  .route('/').get((req, res) => {
    Friend
    .find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  })
  .post((req, res) => {
    const friend = new Friend(req.body);
    friend.save()
    .then(saveFriend => {
      res.status(200).json(saveFriend);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });

router
  .route('/:id').get((req, res) => {
    Friend
    .findById(req.params.id)
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })
  .delete((req, res) => {
      const {id } = req.params;
    Friend.findByIdAndRemove(id)
    .then(response => {
    if (response === null) {
    res.status(404).json({ message:'not found' });
    
    } else {
      res.status(200).json(response);
    }
})

    .catch(error => {
      res.status(500).json(error);
    })
  });


module.exports = router;