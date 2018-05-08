// email, mobile number, github username, facebook username, twitter handle, etc
import mongoose, { Model, Schema, Document } from 'mongoose';
const {
  Types: { ObjectId }
} = Schema;

/**
 * @type mongoose.SchemaDefinition
 */
const ContactTypes = {
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  github: { type: Number, required: true },
  facebook: { type: String, required: true },
  twitter: { type: String, required: true },
  createdOn: { type: Date, default: Date.now, required: true }
};

export const ContactSchema = new Schema(ContactTypes);

/**
 * @type Model<Document>
 */
export const ContactModel = mongoose.model('Contact', ContactSchema);
