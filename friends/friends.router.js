const routerFriends = require('express').Router();
const Friend = require('./friends.model');

routerFriends
  .route('/')
  .get(handleGET)
  .post(handlePOST);

routerFriends
  .route('/:id')
  .get(isIdValid, handleGET)
  .put(isIdValid)
  .delete(isIdValid);

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
      res.status(201).json(response);
    })
    .catch(e => {
      // if there were an Error validatin the data in the Schema:
      if (e.name === 'ValidationError') next(createError(400, e.message));
      // If there were any other problem POSTING to the data base: send custom-default Error.
      next(createError(500, 'There was an error while saving the friend to the database.'));
    });
}
function handleGET(req, res, next) {
  const { id } = req.params;
  const fetching = !id ? Friend.find() : Friend.findById(id);

  fetching
    .then(response => {
      res.status(200).json(response);
    })
    .catch(e => {
      !id ? next(createError(500, 'The friends information could not be retrieved.')) : next(e);
    });
}
/**
 * ERROR: Handle Error
 */
function handleError(err, req, res, next) {
  !err.status ? next(err) : res.status(err.status).json({ errorMessage: err.message });
  next();
}
// return a new custom Error
function createError(code = 500, message = 'Oh, oh.... there is a problem bargain with the dababase, try again!') {
  let e = new Error();
  e.status = code;
  e.message = message;
  return e;
}
/**
 * MIDDLEWARES: Custom middlewears
 */
function isIdValid(req, res, next) {
  const { id } = req.params;
  if (!id) return next();

  Friend.findById(id)
    .then(idFound => {
      return idFound ? next() : next(createError(404, 'The friend with the specified ID does not exist.'));
    })
    .catch(e => {
      next(e);
    });
}
module.exports = routerFriends;
