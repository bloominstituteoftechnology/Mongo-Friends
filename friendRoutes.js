const router = require('express').Router();
const mongoose = require('mongoose');

const Friend = require('./friendSchema');

router
  .get('/', (req, res) => {
    Friend.find({}, (err, dbRes) => {
      if (err)
        return res.status(500).json({ err });
      if (dbRes.length === 0)
        return res.status(404).json({ err: 'Looks like you dont have any friends' });
      res.json(dbRes);
    })
  })
  .post('/', (req, res) => {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age)
      return res.json({ err: 'Please provide a first and last name as well as an age' });
    if (age < 1 || age > 120)
      return res.json({ err: 'A friends age must be between 1 and 120' });
    const friend = { firstName, lastName, age }
    const newFriend = new Friend(friend);
    newFriend.save({}, (err, dbRes) => {
      if (err)
        return res.status(500).json({ err });
      res.json(dbRes);
    });
  });

module.exports = router;