const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' });
  })
  .post((req, res) => {
    res.status(201).json({ status: 'please implement POST functionality' });
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
