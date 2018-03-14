const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendRouter = require('./friends/friendRoutes.js');
const blogRouter = require('./blog/blogRoutes.js');


const server = express();

server.use(helmet(), cors(), express.json());

server.get('/', (req, res) => {
  res.status(200).send({ status: 'API Running '});
});

server.use('/api/friends', friendRouter);
server.use('/api/blog', blogRouter);


mongoose
  .connect('mongodb://localhost/FriendKeeper')
  .then(conn => console.log('connected to mongo'))
  .catch(err => console.log('error connecting to mongo'));

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`API running on http://localhost:${port}.`));