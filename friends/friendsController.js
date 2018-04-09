const router = require('express').Router();

const Friend = require('./friendsModels');

// api/friends

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    console.log('body', req.body);
    const friend = new Friend(req.body);
    console.log('friend', friend);
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'impletment Delete!' });
  })

  .put((req, res) => {
    res.status(200).json({ status: 'implement PUT!' });
  });

module.exports = router;
