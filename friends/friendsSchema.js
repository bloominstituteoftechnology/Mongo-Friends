const router = require('express').Router();
const Friend = require('./friendsModel');

router.route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => res.status(200).json(friends))
      .catch(err => res.status(500).json({ error: "Cannot retrieve friends." }))
  })

module.exports = router;