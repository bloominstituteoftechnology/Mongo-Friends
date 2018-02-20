const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const Bear = require('./Bears/BearModel.js');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

// server.post('/api/bears', (req, res) => {
//   const bearInformation = req.body;

//   if (!bearInformation.species || !bearInformation.latinName) {
//     res.status(500).send({
//       errorMessage: 'Please provide both species and latinName for the Bear.',
//     });
//     return;
//   }

//   const bear = new Bear(bearInformation);

//   bear
//     .save()
//     .then(savedBear => res.status(201).json(savedBear))
//     .catch(err =>
//       res.status(500).json({
//         error: 'There was an error while saving the Bear to the Database',
//       }),
//     );
// });

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

// mongoose
//   .connect('mongodb://localhost/BearKeeper')
//   .then(db => {
//     console.log(`Successfully connected to ${db.connections[0].name} database`);
//   })
//   .catch(err => {
//     console.error('Database connection failed.');
//   });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
