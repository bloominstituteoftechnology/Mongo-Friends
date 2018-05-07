const router = require('express').Router();

const Friends = require('./friendsModel');

router.route('/').get(get).post(post);

router  
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/:id' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'Please implement Delete functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement put functionality' });
  });

  function get(req, res) {
    res.status(200).json({ route: '/api/friends' });
  }

  function post(req, res) {
    const friendsData = req.body;

    const friend = new Friends(friendsData)

    friend.save().then(friend => {
      res.status(201).json({ status: 'created'})
    })
    .catch(err => {
      res.status(500).json(err);
    }); 
  }

  module.exports = router;