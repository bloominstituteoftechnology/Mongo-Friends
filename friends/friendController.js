const router = require('express').Router()

const Friend = require('./friendsDb')

router
  .route('/')
  .get((req, res) => {
    Friend.find().then(friends =>{
    res.status(200).json(friends)})
  })






module.exports = router;
