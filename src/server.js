import express, { Router } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import mainRouter from './routes';
import { createMongoUrl } from './utils';

if (process.env.NODE_ENV !== 'production') {
  // dev things
  const dotenv = require('dotenv').config();
}

/**
 * @type {express.Application}
 */
const server = express();
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

// if there is no .env file, try to connect to local db
const MongoUrl = !process.env.MONGO_PROTOCOL
  ? createMongoUrl()
  : createMongoUrl(
      process.env.MONGO_PROTOCOL,
      process.env.MONGO_DB,
      process.env.MONGO_USER /* Remove if needed */,
      process.env.MONGO_SECRET /* Remove if needed */
    );
mongoose.connect(MongoUrl);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api', mainRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
