const routerFriends = require('express').Router();
const Friend = require('./friends.model');

routerFriends
  .route('/')
  .get()
  .post();

routerFriends
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = routerFriends;
