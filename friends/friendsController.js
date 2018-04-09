const router = require('express').Router();
const friends = require('./friendsModel');

router
  .route('/')
  .get((req, res) => {
    friends
      .find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json({ error: 'something went wrong with the server' });
      });
  })
  .post((req, res) => {
    const friend = new friends(req.body);
    friend
      .save()
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({ error: 'could not save you friend' });
      });
  });

router
  .route('/:id')
  //#################//
  .get((req, res) => {
    friends
      .findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({ error: 'some server related issues' });
      });
  })

  .delete((req, res) => {
    friends
      .findByIdAndRemove(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(500).json({ error: 'could not delete the friend' });
      });
  })

  .put((req, res) => {
    const updatedInfo = req.body;
    console.log(updatedInfo);
    friends
      .findByIdAndUpdate(req.params.id, updatedInfo)
      .then(updatedFriend => {
        res.status(200).json(updatedFriend);
      })
      .catch(error => {
        res.status(500).json({ error: 'error happened updated your friend' });
      });
  });

module.exports = router;
