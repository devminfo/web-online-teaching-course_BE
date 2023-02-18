import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserBank {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idUser: ObjectId;

  @Prop({ type: String, default: '' })
  readonly nickName: string;

  @Prop({ type: String, default: '' })
  readonly accountNumber: string;

  @Prop({ type: String, default: '' })
  readonly bankName: string;

  @Prop({ type: String, default: '' })
  readonly bankBranch: string;

  @Prop({ type: String, default: '' })
  readonly accountName: string;

  @Prop({ type: Boolean, default: false })
  readonly isDefault: boolean;
}

export type UserBankDocument = UserBank & Document;
export const UserBankSchema = SchemaFactory.createForClass(UserBank);
