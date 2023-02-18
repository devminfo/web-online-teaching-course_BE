import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserTest {
  @Prop({ type: String, default: '' })
  idTestQuestion: string;

  @Prop({ type: String, default: '' })
  idUser: string;

  @Prop({ type: String, default: '' })
  score: string;

  @Prop({ type: String, default: '' })
  totalCorrect: string;

  @Prop({ type: String, default: '' })
  totalAnswers: string;

  @Prop({ type: String, default: '' })
  time: string;
}

export type UserTestDocument = UserTest & Document;
export const UserTestSchema = SchemaFactory.createForClass(UserTest);
