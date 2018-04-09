const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/' });
  })
  .post((req, res) => {
    res.status(201).json({ status: 'please implement POST functionality' });
  });

  router
    .route('/:id')
    .get((req, res) => {
      res.status(200).json({ route: '/api/friends/' + req.params.id  });
    })
    .delete((req, res) => {
      res.status(200).json({ status: 'please implement DELETE functionality' });
    })
    .post((req, res) => {
      res.status(200).json({ status: 'please implement PUT functionality' });
    });

  module.exports = router;
