const express = require('express');

const Users = require('./userModel.js');
const statusCodes = require('../common/statusErrors.js');

const userRouter = express.Router();

/* *** Users *** */
userRouter.get('/', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.serverErrorMessage);
    else res.status(statusCodes.success).send(users);
  });
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id, (err, user) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.userNotFoundMessage);
    else res.status(statusCodes.success).send(user);
  });
});

userRouter.post('/', (req, res) => {
  const newUser = new Users(req.body);

  newUser.save((err, user) => {
    if (err) res.status(statusCodes.userError).send(statusCodes.UserErrorMessage);
    else res.status(statusCodes.successCreated).send(user);
  });
});

userRouter.delete('/', (req, res) => {
  const { id } = req.body;

  Users.findById(id, (err, user) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.userNotFoundMessage);
    else return user;
  }).remove((err, confirm) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.serverErrorMessage);
    else res.status(statusCodes.success).send(confirm);
  });
});

module.exports = userRouter