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

routerFriends.use(handleError);

/**
 * ROUTER HANDLERS: handle endpoints
 */

/**
 * ERROR: Handle Error
 */
function handleError(err, req, res, next) {
  !err.status ? next(err) : res.status(err.status).json(err.message);
  next();
}
//This function add some properties to an Error object
function createError(code = 500, message = 'Ups, there were a problem fetching the info from the database') {
  let e = new Error();
  e.status = code;
  e.message = message;
  return e;
}
/**
 * MIDDLEWARES: Custom middlewears
 */
module.exports = routerFriends;
