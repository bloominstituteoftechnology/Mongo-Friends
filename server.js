const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Friend = require('./Friends/FriendModel.js');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post('/api/friends', (req, res) => {
  const { firstName, lastName } = req.body;
  const age = +req.body.age;
  const friendInformation = { firstName, lastName, age };

  if (!firstName || !lastName || req.body.age === undefined) {
    res.status(400).json({
      errorMessage:
        'Please provide firstName, lastName and age for the friend.',
    });
    return;
  }

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    res.status(400).json({
      errorMessage: 'Age must be a whole number between 1 and 120',
    });
    return;
  }

  const friend = new Friend(friendInformation);

  friend
    .save()
    .then(savedFriend => res.status(201).json(savedFriend))
    .catch(err =>
      res.status(500).json({
        error: 'There was an error while saving the friend to the database',
      }),
    );
});

// server.get('/api/bears', (req, res) => {
//   Bear.find()
//     .then(bears => res.status(200).json(bears))
//     .catch(err =>
//       res.status(500).json({
//         error: 'The information could not be retrieved.',
//       }),
//     );
// });

// server.get('/api/bears/:id', (req, res) => {
//   const { id } = req.params;

//   Bear.findById(id)
//     .then(bear => res.status(200).json(bear))
//     .catch(err =>
//       res.status(500).json({
//         error: 'The bear information could not be retrieved.',
//       }),
//     );
// });

// server.delete('/api/bears/:id', (req, res) => {
//   const { id } = req.params;

//   Bear.findById(id)
//     .then(bear => {
//       Bear.findByIdAndRemove(bear._id)
//         .then(deletedBear => {
//           res.status(200).send(deletedBear);
//           return;
//         })
//         .catch(err => {
//           res.status(500).send({
//             error: 'The Bear could not be removed',
//           });
//           return;
//         });
//     })
//     .catch(err => {
//       res.status(404).json({
//         message: 'The Bear with the specified ID does not exist.',
//       });
//       return;
//     });
// });

// server.put('/api/bears/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedBear = req.body;

//   Bear.findById(id)
//     .then(bear => {
//       Bear.findByIdAndUpdate(bear._id, updatedBear, { new: true })
//         .then(updatedBear => {
//           res.status(200).send(updatedBear);
//           return;
//         })
//         .catch(err => {
//           res.status(500).send({
//             error: 'The Bear information could not be modified.',
//           });
//           return;
//         });
//     })
//     .catch(err => {
//       res.status(404).json({
//         message: 'The Bear with the specified ID does not exist.',
//       });
//       return;
//     });
// });

mongoose
  .connect('mongodb://localhost/FriendKeeper')
  .then(db => {
    console.log(`Successfully connected to ${db.connections[0].name} database`);
  })
  .catch(err => {
    console.error('Database connection failed.');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
