import express, { Router } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { createMongoUrl, asyncMiddWrapper } from './utils';
import { FriendsModel } from './models/Friends';

if (process.env.NODE_ENV !== 'production') {
  // dev things
  const dotenv = require('dotenv').config();
}

const MongoUrl = createMongoUrl(
  process.env.MONGO_PROTOCOL,
  process.env.MONGO_DB,
  process.env.MONGO_USER /* Remove if needed */,
  process.env.MONGO_SECRET /* Remove if needed */
);
mongoose.connect(MongoUrl);

const FriendsRouter = Router({ mergeParams: true });

/**
 * Logic to get all friends
 * @param {express.Request} req Express Request object
 * @param {express.Response} res Express Response object
 */
const getAllFriends = async (req, res) => {
  const friends = await FriendsModel.find().exec();
  res.json(friends);
};
const FriendsRouteHandler = asyncMiddWrapper(getAllFriends);
FriendsRouter.get('/', FriendsRouteHandler);

const server = express();
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', FriendsRouteHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
