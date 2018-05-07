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
  .catch(err => console.log(err))
});

// server.get('/api/friends/:id', (req, res) => {
//   const id = req.params.id;
//   model.findById(id)
//   .then(response => res.status(200).json({response}) )
//   .catch(err => console.log(err))
// });



server.get('/api/friends/:id', (req, res) => {
const id = req.params.id;

model
.findById(id)
.then(response => {
  res.status(200).json({response})
})
.catch(err => {
  console.log(err)
  // res.status(404).json({msg: 'something wrong..'})
res.status(500).json(`{ errorMessage: "The friend information could not be retrieved." }`)
})
})

//post

server.post('/api/friends', (req, res) => {
  const body = req.body;
  const friend = new model(body);
  friend.save()
  .then(response => res.status(201).json(response))
  .catch(err => console.log(err))
})




server.delete('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  model.findByIdAndRemove(id)
  .then(response => {
    console.log(response)
    res.status(200)
  })
  .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }))
})




const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
