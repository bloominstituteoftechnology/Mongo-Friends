const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Friend = require('./Friend.js');

mongoose
.connect('mongodb://localhost/frienddb')
.then( mongo =>  console.log('Connected to Mongo-I-Friends DB'))
.catch(err =>  consol.log('Errof connecting to database', err));

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
})

server.get('/friends', (req, res) => { // GET ALL FRIENDS 
  Friend
  .find()
  .then(friends => res.json(friends))
  .catch( (err) => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
})
server.get('/friends/:id', (req, res) => { // GET FRIEND BY ID 
  const { id } = req.params;
  Friend
  .findById(id)
  .then(friend => res.status(200).json(friend)) // DOESNT WORK
  .catch( (err) => err ? res.status(404).json({ error: 'Friend not found' }) : res.status(500).end("Server Error"))
})
server.post('/friends', (req, res) => { // POST NEW FRIEND 
  const userInput = req.body;
  console.log('\n POST_FIREND \n', userInput);
  const friend = new Friend(userInput);
    friend
      .save()
      .then(friend => res.status(201, console.log ('\n Successfully created friend \n')).json(friend))
      .catch( () => { //DOESNT WORK LIKE I WANT IT TOO....
        if (lastName === null || firstName === undefined) {
          return res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        } 
        else { res.status(500).json(error) }
      })
})
server.delete('/friends/:id', (req, res) => { // DELETE FRIEND BY ID 
    const { id } = req.params;
    let friend;
    console.log("FRIEND TO DELETE = ", id);
      Friend
        .findById(id)
        .then(foundFriend => { 
          friend = { ...foundFriend[0] };
            Friend
            .findByIdAndRemove(id)
              .then(response => res.status(200).json(response))
          })
          .catch((err) => res.status(500).send({ error: 'Error deleting friend', err }))
})
server.put('/friends/:id', (req, res) => { // UPDATE FRIEND BY ID 
  const { id } = req.params;
  const update = req.body;
  Friend
  .findByIdAndUpdate(id, update, {new: true}, (err, friend) => {
        if (err) return res.status(500).send(err);
        return res.send(friend);
    })
})



const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
