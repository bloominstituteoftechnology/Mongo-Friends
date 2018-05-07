// cannot import {model, Schema} from 'mongoose'
// https://github.com/Automattic/mongoose/issues/6379
import mongoose, { Model, Schema, Document } from 'mongoose';
const {
  Types: { ObjectId }
} = Schema;

const FriendTypes = {
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
 * @type Model<Document>
 */
export const FriendModel = mongoose.model('Friend', FriendsSchema);
