const router = require('express').Router();
const Friend = require('./friendModel'); //pulling in the friend model file

router
  .route('/')
  .get((req, res) => {
    Friend.find()
    .then(friends => {
      res.status(202)
      res.json({ friends })
    })
    .catch (err => {
      res.status(200)
      res.json({ message: 'Error fetching friends' });
    })
  })




module.exports = router;