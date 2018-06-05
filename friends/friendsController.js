const router = require('express').Router()
const Friend = require('./friendsSchema')

// friend api/friends

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(error => {
        res.status(500).json(err)
      })
  })
  .post((req, res) => {
    const friend = new Friend(req.body)
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend)
      })
      .catch(error => {
        res.status(500).json(err)
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends)
      })
      .catch(error => {
        res.status(500).json(err)
      })
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  .put((req, res) => {
    // const changes = {...req.body, updateOn= new Date()}
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  })

module.exports = router
