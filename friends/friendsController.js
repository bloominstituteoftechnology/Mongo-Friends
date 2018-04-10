const router = require('express').Router();
const Friend = require('./friendsModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })

  .post((req, res) => {
    const friend = new Friend(req.body);
    friend
      .save()
      .then(saveFriend => {
        res.status(200).json(saveFriend);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.route('/:id/contactInfo').get((req, res) => {

  Friend.findById(req.params.id)
    .then(friends => {
      res.status(200).json(friends.contactInfo);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(deleteFriend => {
        res.status(200).json(deleteFriend);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
      }
    })
      .then(updateFriend => {
        res.status(200).json(updateFriend);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;
