const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const friendRouter = require('./db/friends/FriendRoutes');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

// server.get('/', function(req, res) {
//   res.status(200).json({ status: 'API Running' });
// });

server.use('/api/friends', friendRouter);

mongoose
  .connect('mongodb://localhost/FriendKeeper')
  .then(conn => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
