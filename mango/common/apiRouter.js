const express = require('express');

const userRouter = require('../users/userRoutes.js');
const blogRouter = require('../blogPost/blogRoutes.js');

const api = express.Router();

/* *** Routing *** */
api.use('/users', userRouter);
api.use('/blog', blogRouter);

module.exports = api;