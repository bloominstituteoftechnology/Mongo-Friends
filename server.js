const server = require('express')();
const helmet = require('helmet');
const cors = require('cors');
const dbConnection = require('./dbConnection');
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(require('express').json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
