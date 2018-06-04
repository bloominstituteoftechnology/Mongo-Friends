const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/friends', bearController)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/dbFriends', {}, err => {
  if (err) console.log('Database connection failed!', err)
  console.log('Succcessfully connected to mongo DB')
})

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
