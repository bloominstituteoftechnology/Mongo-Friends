import { Router, Request, Response } from 'express';
import { FriendModel } from '../models/Friends';
import { asyncMiddWrapper, jsonError } from '../utils';

const FriendsRouter = Router({ mergeParams: true });

/**
 * Logic to get all friends
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 */
const getAllFriends = async (req, res) => {
  const friends = await FriendModel.find().exec();
  res.json(friends);
};

const FriendsRouteHandler = asyncMiddWrapper(getAllFriends);
FriendsRouter.get('/', FriendsRouteHandler);

/**
 * Get single friend using Id
 * @param {Request} req
 * @param {Response} res
 */
const getFriendById = async (req, res) => {
  const friend = await FriendModel.findById(req.params.id).exec();
  res.json(friend);
};

const SingleFriendRouteHandler = asyncMiddWrapper(getFriendById);
FriendsRouter.get('/:id', SingleFriendRouteHandler);

/**
 * Post Friend from request body
 * @param {Request} req
 * @param {Response} res
 */
const postFriend = async (req, res) => {
  const { body } = req;
  validateFriend(body) 
  const newFriend = new FriendModel(body);
  const handled = await newFriend.save();
  console.log(handled);
  res.json(handled);
};

const validateFriend = (friend) => {
  if (!friend.firstName || !friend.lastName || !friend.age) {
    throw new Error('Please provide firstName, lastName and age for the friend.')
  }
  if (typeof friend.age !== 'number' || friend.age > 120 || friend.age < 1) {
    throw new Error('Age must be a number between 1 and 120')
  }
}  

const PostFriendRouteHandler = asyncMiddWrapper(postFriend, jsonError);
FriendsRouter.post('/', PostFriendRouteHandler);

export default FriendsRouter;
