import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  // dev things
  const dotenv = require('dotenv').config();
}

const server = express();
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
