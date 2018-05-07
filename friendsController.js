const router = require('express').Router();

const 

router
  .route('/')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends' });
  })
  .post((req, res) => {
    res.status(201).json({ status: 'created'})
  });

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

  module.exports = router;