const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const port = 3000;
server.use(bodyParser.json());
server.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongo://localhost:27017/users', { useMongoClient: true });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
