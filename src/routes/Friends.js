import { Router, Request, Response } from 'express';
import { FriendsModel } from '../models/Friends';
import { asyncMiddWrapper } from '../utils';

const FriendsRouter = Router({ mergeParams: true });

/**
 * Logic to get all friends
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 */
const getAllFriends = async (req, res) => {
  const friends = await FriendsModel.find().exec();
  res.json(friends);
};

const FriendsRouteHandler = asyncMiddWrapper(getAllFriends);
FriendsRouter.get('/', FriendsRouteHandler);

export default FriendsRouter;
