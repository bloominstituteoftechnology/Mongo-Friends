const express = require("express");

const userRouter = require("../users/usersRouter.js");
const blogRouter = require("../blogPosts/blogRouter.js");

const api = express.Router();

api.use("/users", userRouter);
api.use("/blogposts", blogRouter);

module.exports = api;
