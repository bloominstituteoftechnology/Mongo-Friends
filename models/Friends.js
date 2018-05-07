import { Schema, Types, Model } from 'mongoose';
const { ObjectId } = Types;

const FriendTypes = {
  _id: ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now, required: true }
};

/**
 * Mongoose Schema for friends document
 * @type Schema
 */
export const FriendsSchema = new Schema(FriendTypes);

/**
 * Mongoose Model for friends document
 * @type Model<FriendsSchema>
 */
export const FriendsModel = Model('Friends', FriendsSchema);
