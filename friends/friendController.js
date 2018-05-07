const router = require('express').Router();

const Friend = require('./friendModel');

router.route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.json(friends);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  })


module.exports = router;