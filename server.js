//import { S_IFBLK } from 'constants';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js')
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();



// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());


// TODO: write your server code here
server.post('/api/users', (req, res) => {
  const {firstName, lastName //, address: {street1} 
      ,address: {street1, street2, city, state , zip: {region, plus4} }
  } = req.body
  if (!firstName || !lastName || !street1 || !city || !state || !region) 
  // if (!firstName || !lastName)
    res.status(STATUS_USER_ERROR).json({error: 'must include first and last name, street, city, state, and 5 digit zip'})

  const newUser = new User(req.body);
  console.log('newUser:', newUser)
  newUser.save((err,user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({error: "Server Error"})
    }
    else {
      res.status(201).json(newUser)
    }
  })
})
server.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(STATUS_SERVER_ERROR).json({error: 'Server Error'})
    res.json(users)
  })
})
server.get('/api/users/:id', (res,req) => {
  const { id } = res.params;
  User.findOne({_id: id}, (err, user) => {
    if (err) req.status(STATUS_SERVER_ERROR).json({error: 'Server Error'})
    if (user === null) req.status(STATUS_USER_ERROR).json({error: 'Not Found'})
    else req.json(user)
  })
})
server.delete('/api/users/:id', (res,req) => {
  const { id } = res.params;
  User.remove({_id: id}, (err, user) => {
    if (err) req.status(STATUS_SERVER_ERROR).json({error: 'Server Error'})
    req.json(user)
  })
})

const AtlasMongoIUrl = 
'mongodb://LambdaDataManager:XPoCMUH4qMHINDKc@cluster0-shard-00-00-2ydlw.mongodb.net:27017,cluster0-shard-00-01-2ydlw.mongodb.net:27017,cluster0-shard-00-02-2ydlw.mongodb.net:27017/mongoi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const LocalUrk = 'mongodb://localhost/users'

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  AtlasMongoIUrl,
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
