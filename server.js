const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();


server.use(helmet()); 
server.use(cors());  
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
  