import { ObjectId } from 'mongodb';

export type TokenPayload = {
  _id: string;
  role: string;
  email?: string;
  phone?: string;
  fullName?: string;
};
