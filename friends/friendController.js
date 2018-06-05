//What does this do?
const router = require("express").Router();

const Friend = require("./Friend");

const sendErrorMessage = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};
