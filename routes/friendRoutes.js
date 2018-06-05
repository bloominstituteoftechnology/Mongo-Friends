const router = require('express').Router();
const mongoose = require('mongoose');

const Friend = require('../database/friendSchema');
const error = require('./helpers/error');

/*************************
** ROUTE / **
*************************/
router
  // get
  .get('/', (req, res) => {
    Friend.find({}, (err, dbRes) => {
      if (err)
        return error(res, 500, 'ERROR');
      if (dbRes.length === 0)
        return error(res, 404, 'Looks like you dont have any friends');
      res.json(dbRes);
    })
  })
  // post
  .post('/', (req, res) => {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age)
      return error(res, 400, 'Please provide a first and last name as well as an age');
    if (age < 1 || age > 120)
      return error(res, 400, 'A friends age must be between 1 and 120');
    const friend = { firstName, lastName, age }
    const newFriend = new Friend(friend);
    newFriend.save({}, (err, dbRes) => {
      if (err)
      return error(res, 500, 'ERROR');
      res.json(dbRes);
    });
  });

/*************************
** ROUTE /:id **
*************************/
router
  // get
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Friend.findById(id, (err, dbRes) => {
      if (err)
        return error(res, 500, 'ERROR');
      if (!dbRes)
        return error(res, 404, 'That friend doesnt exist');
      res.json(dbRes);
    });
  })
  // delete
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    Friend.findByIdAndDelete(id, (req, res) => {
      if (err)
        return error(res, 500, 'ERROR');
      if (dbRes.length === 0)
        return error(res, 404, 'That friend doesnt exist');
      res.json(dbRes);
    });
  })
  // put
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    Friend.findById(id, (err, raw) => {
      if (err)
        return error(res, 500, 'ERROR');
      if (!raw)
        return error(res, 404, 'That friend doesnt exist');
      raw.firstName = firstName || raw.firstName;
      raw.lastName  = lastName || raw.lastName;
      raw.age       = age || raw.age;
      raw.save((err, newRaw) => {
        if (err)
          return error(res, 500, 'ERROR');
        res.json(newRaw);
      });
    })
  })
  
module.exports = router;