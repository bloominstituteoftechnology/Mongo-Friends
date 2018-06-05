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
        return error(res, 500, err.message);

      if (!dbRes.length)
        return error(res, 404, 'Looks like you dont have any friends');

      res.json(dbRes);
    })
  })
  // post
  .post('/', (req, res) => {
    const friend = ({ firstName, lastName, age, contactInfo: { email, mobileNum, github, facebook, twitter } } = req.body);
    const newFriend = new Friend(friend);

    newFriend.save({}, (err, dbRes) => {
      if (err) {
        const { errors, message } = err;
        
        if (errors.firstName || errors.lastName)
          return error(res, 400, 'Please provide a first and last name');

        if (errors.age)
          return error(res, 400, 'Please provide an age that is between 1 and 120');
          
        return error(res, 500, message);
      }

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
        return error(res, 500, err.message);

      if (!dbRes)
        return error(res, 404, 'That friend doesnt exist');

      res.json(dbRes);
    });
  })
  // delete
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Friend.findByIdAndDelete(id, (err, raw) => {
      if (err)
        return error(res, 500, err.message);

      if (!raw)
        return error(res, 404, 'That friend doesnt exist');

      res.json(raw);
    });
  })
  // put
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, contactInfo: { email, mobileNum, github, facebook, twitter } } = req.body;
    
    Friend.findById(id, (err, raw) => {
      if (err)
        return error(res, 500, err.message);

      if (!raw)
        return error(res, 404, 'That friend doesnt exist');
        
      raw.firstName = firstName || raw.firstName;
      raw.lastName  = lastName || raw.lastName;
      raw.age       = age || raw.age;
      
      raw.save((err, newRaw) => {
        if (err)
          return error(res, 500, err.message);

        res.json(newRaw);
      });
    })
  })
  
module.exports = router;