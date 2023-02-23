import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserTest {
  @Prop({ type: String, ref: 'TestQuestion' })
  readonly testQuestion: string;

  @Prop({ type: String, ref: 'User' })
  readonly idUser: string;

  @Prop({ type: Number, default: 0 })
  readonly score: number;

  @Prop({ type: [String], default: [] })
  readonly correctQuestions: string;

  @Prop({ type: [String], default: [] })
  readonly incorrectQuestions: string[];

  @Prop({ type: Number, default: 0 })
  readonly starTime: number;

  @Prop({ type: Number, default: 0 })
  readonly endTime: number;
}

export type UserTestDocument = UserTest & Document;
export const UserTestSchema = SchemaFactory.createForClass(UserTest);
