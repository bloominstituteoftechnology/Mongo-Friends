const routerFriends = require('express').Router();
const Friend = require('./friends.model');

routerFriends
  .route('/')
  .get()
  .post(handlePOST);

routerFriends
  .route('/:id')
  .get()
  .put()
  .delete();

routerFriends.use(handleError);

/**
 * ROUTER HANDLERS: handle endpoints
 */
function handlePOST(req, res, next) {
  const data = ({ firstName, lastName, age } = req.body);
  if (!firstName || !lastName || (age !== 0 && !age))
    // create an error and past it to "handleError"
    next(createError(400, 'Please provide firstName, lastName and age for the friend.'));

  const newFriend = new Friend(data);
  newFriend
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(e => {
      // if there were an Error validatin the data in the Schema:
      if (e.name === 'ValidationError') next(createError(400, e.message));
      // If there were any other problem POSTING to the data base: send custom-default Error.
      next(createError());
    });
}
/**
 * ERROR: Handle Error
 */
function handleError(err, req, res, next) {
  !err.status ? next(err) : res.status(err.status).json({ errorMessage: err.message });
  next();
}
function createError(code = 500, message = 'Oh, oh.... there is a problem bargain with the dababase, try again!') {
  let e = new Error();
  e.status = code;
  e.message = message;
  return e;
}
/**
 * MIDDLEWARES: Custom middlewears
 */
module.exports = routerFriends;
