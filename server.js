const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const model = require('./friends/model');
const server = express();
const mongoose = require('mongoose');

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose
  .connect('mongodb://localhost/frienddb')
  // .connect('mongodb://host_name/database_name')
  .then(mongo => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });



server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


server.get('/api/friends', (req, res) => {
  model.find()
  .then(response => res.status(200).json({response}) )
  .catch(err => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
});



server.get('/api/friends/:id', (req, res) => {
  model.findById(req.params.id)
  .then(friend => {
    if(friend){
      res.status(200).json(friend)
    } else {
      res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
  })
  .catch(err => res.status(500).json({ errorMessage: "The friend information could not be retrieved." }))
})

//post

server.post('/api/friends', (req, res) => {

  const {firstName, lastName, age} = req.body;
  if(!firstName || !lastName || !age){
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
  } else if(isNaN(age)){
    res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
  }
  const friend = new model(req.body);
  friend.save()
  .then(friend => res.status(201).json(friend))
  .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." }))
})




server.delete('/api/friends/:id', (req, res) => {
  model.findByIdAndRemove(req.params.id)
  .then(resp =>{
    console.log(resp)
    if(resp){
      res.status(204).end()
    } else {
      res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
  })
  .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }))
})




const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
