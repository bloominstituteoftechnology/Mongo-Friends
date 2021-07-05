const router = require('express').Router();
const Friend = require('../models/friend');

router
  .route('/')
  .get((req, res) => {
    Friend
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => res.status(500).json({
        error: 'Error getting friends'
      }))
  })

  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    const newFriend = new Friend({
      firstName,
      lastName,
      age
    });
    newFriend
      

  })