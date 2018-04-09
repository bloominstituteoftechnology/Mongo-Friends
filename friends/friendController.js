const router = require('express').Router();

const Friend = require('./friendModel.js');

router.route('/').get((req, res) => {
  Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
