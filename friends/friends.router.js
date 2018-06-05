const routerFriends = require('express').Router();

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
