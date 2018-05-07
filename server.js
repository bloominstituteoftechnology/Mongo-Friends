const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Friend = require('./Friend.js');

mongoose
.connect('mongodb://localhost/frienddb')
.then( mongo => {
  console.log('Connected to Mongo-I-Friends DB');
})
.catch(err => {
  consol.log('Errof connecting to database', err);
});

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/friends', (req, res) => { // GET ALL FRIENDS 
  Friend
  .find()
  .then(friends => res.json(friends))
  .catch( (err) => res.status(500).json({ error: err }))
// .catch( () => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
});

server.get('/friends/:id', (req, res) => { // GET FRIEND BY ID 
  const { id } = req.params;
  Friend
  .find(id)
  .then(friends => res.json(friends))
  .catch( (err) => res.status(500).json({ error: err }))
// .catch( () => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
});

server.post('/friends', (req, res) => {
  const userInput = req.body;
  console.log('\n POST_FIREND \n', userInput);
  const friend = new Friend(userInput);
  friend
  .save()
  .then(friend => res.status(201, console.log ('\n Successfully created friend \n')).json(friend ))
  .catch( err => res.status(500).json(err))
})


// function get(req, res) {
//   Friend
//   .find()
//   .then(friends => {
//     res.status(200).json(friends);
//   })
// }

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
