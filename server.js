const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

// connect to mongo
mongoose
  .connect('mongodb://localhost/frienddb')
  .then(mongo => {
    console.log('conneced to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

const friendsController = require('./friends/friendsController');
const Friend = require('./friends/friendsModel');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/api/friends', (req, res) => {

  Friend
    .find()
    .then(friends => {    
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
    });
});

server.get('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend
    .findById(id)
    .then(friends => {
      if (friends.length === 0) {
        res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." });
      } else {
        res.json(friends);
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: "The friend information could not be retrieved."});
    });
})

// server.delete('api/friends/:id', (req, res) => {
//   const id = req.params.id;

//   Friend
//     .findByIdAndRemove(id)
//     .then(friends => {
//       if (!id) {
//         res.status(404).json({message: "The friend with the specified ID does not exist." });
//       } else {
//         res.status(200).json(friend);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ errorMessage: "The friend could not be removed" });
//     })
// });

// server.put('api/friends/:id', (req, res) => {
//   const id = req.params.id;
//   const friendInfo = req.body;

//   Friend
//     .findByIdAndUpdate(id, friendInfo)
//     .then(res => {
//       if (!firstName)
//       res.status(200).json({ friendInfo })
//     })
//     .catch(err => {
//       res.status(500).json({ errorMessage: "The friend information could not be modified." })
//     })
// })

server.use('/api/friends', friendsController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
