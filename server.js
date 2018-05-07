const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose')
const friendRouter = require('./routers/friendRouter');
const bodyParser = require('body-parser');

const server = express();

mongoose
.connect('mongodb://localhost/friendsDB', { useMongoClient: true })
.then(mongo => {
  console.log('properly connected to database!')
})
.catch(error => {
    console.log('error connecting', error)
  });

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use('/api/friends', friendRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));

//

// server.post('/api/friends', (req, res) => {
//   const { id } = req.params;
//   const post = req.body;
  
//   res.status(200).json(post);
// });

// server.get('/api/friends', (req, res) => {
//   res.status(200).json('HERE YA GO, testing this shit');
// });

// server.get('/api/friends/:id', (req, res) => {
//   const { id } = req.params;
//   const post = req.body;

//   res.status(200).json(post);
// });

// server.delete('/api/friends/:id', (req, res) => {
//   const post = req.body;
//   const { id } = req.params;

//   res.status(200).json(`deleted ${post} with id of ${id}`);
// });

// server.put('/api/friends/:id', (req, res) => {
//   const update = req.body;
//   const post = req.params;

//   res.status(200).json(update);
// });