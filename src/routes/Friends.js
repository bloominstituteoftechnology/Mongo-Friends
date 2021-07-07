import { Router, Request, Response } from 'express';
import { FriendModel } from '../models/Friends';
import { asyncMiddWrapper, jsonError } from '../utils';
import {
  userMissingFieldError,
  userInvalidAgeError,
  userRetrievalFailedError,
  userCreationFailedError,
  usersRetrievalFailedError,
  userUpdateFailedError,
  userDeletionFailedError,
  userDeletionIdError
} from '../errors';

/**
 * An object representing a Friend
 * @typedef {Object} Friend
 * @property {string=} firstName
 * @property {string=} lastName
 * @property {number=} age
 * @property {Date=} createdOn
 * @property {Object=} ContactInfo
 */

const FriendsRouter = Router({ mergeParams: true });

/**
 * Logic to get all friends
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 */
const getAllFriends = async (req, res) => {
  try {
    res.json(await FriendModel.find().exec());
  } catch (_) {
    throw usersRetrievalFailedError;
  }
};

const FriendsRouteHandler = asyncMiddWrapper(getAllFriends);
FriendsRouter.get('/', FriendsRouteHandler);

/**
 * Get single friend using Id
 * @param {Request} req
 * @param {Response} res
 */
const getFriendById = async (req, res) => {
  try {
    res.json(await FriendModel.findById(req.params.id).exec());
  } catch (_) {
    throw userRetrievalFailedError;
  }
};

const SingleFriendRouteHandler = asyncMiddWrapper(getFriendById, jsonError);
FriendsRouter.get('/:id', SingleFriendRouteHandler);

/**
 * Post Friend from request body
 * @param {Request} req
 * @param {Response} res
 */
const postFriend = async (req, res) => {
  const { body } = req;
  validateFriend(body);
  const newFriend = new FriendModel(body);
  try {
    const handled = await newFriend.save();
    res.json(handled);
  } catch (_) {
    throw userCreationFailedError;
  }
};

const PostFriendRouteHandler = asyncMiddWrapper(postFriend, jsonError);
FriendsRouter.post('/', PostFriendRouteHandler);

/**
 * Put Friend from request body
 * @param {Request} req
 * @param {Response} res
 */
const putFriend = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  validateFriend(body);
  try {
    res.send(await FriendModel.findByIdAndUpdate(id, body, { new: true }));
  } catch (_) {
    throw userUpdateFailedError;
  }
};

const PutFriendRouteHandler = asyncMiddWrapper(putFriend, jsonError);
FriendsRouter.put('/:id', PutFriendRouteHandler);

/**
 * Delete Friend by id
 * @param {Request} req
 * @param {Response} res
 */
const deleteFriend = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedFriend = await FriendModel.findByIdAndRemove(id);
    if (!deletedFriend) {
      throw userDeletionIdError;
    }
    res.send(deletedFriend);
  } catch (err) {
    if (err == userDeletionIdError) {
      throw err;
    } else {
      throw userDeletionFailedError;
    }
  }
};

const DeleteFriendRouteHandler = asyncMiddWrapper(deleteFriend, jsonError);
FriendsRouter.delete('/:id', DeleteFriendRouteHandler);

/**
 * Validates user input when creating or updating a friend
 * firstName, lastName, and age are required
 * age must be a number between 1 and 120
 * @param {Friend} friend
 */
const validateFriend = friend => {
  if (!friend.firstName || !friend.lastName || !friend.age) {
    throw userMissingFieldError;
  }
  if (typeof friend.age !== 'number' || friend.age > 120 || friend.age < 1) {
    throw userInvalidAgeError;
  }
};

export default FriendsRouter;
