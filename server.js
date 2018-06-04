const server = require('express')();
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 5000;
const dbConnection = require('./dbConnection');
const routes = require('./routes');

server.use(helmet());
server.use(cors());
server.use(require('express').json());
server.use('/', routes);

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
