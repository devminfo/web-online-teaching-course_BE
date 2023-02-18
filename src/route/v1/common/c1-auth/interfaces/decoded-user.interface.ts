import { Types } from 'mongoose';

export interface DecodedUser {
  readonly _id: Types.ObjectId;

  readonly email: string;

  readonly password: string;

  readonly role: string;

  readonly ignoreOwner: boolean;

  readonly iat?: number;

  readonly exp?: number;
}
