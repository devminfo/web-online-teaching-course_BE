import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserTest {
  @Prop({ type: String, ref: 'TestQuestion' })
  testQuestion: string;

  @Prop({ type: String, ref: 'User' })
  idUser: string;

  @Prop({ type: String, default: '' })
  score: string;

  @Prop({ type: [String], default: [] })
  correctQuestions: string;

  @Prop({ type: [String], default: [] })
  incorrectQuestions: string[];

  @Prop({ type: Number, default: 0 })
  starTime: number;

  @Prop({ type: Number, default: 0 })
  endTime: number;
}

export type UserTestDocument = UserTest & Document;
export const UserTestSchema = SchemaFactory.createForClass(UserTest);
