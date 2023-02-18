import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class TestQuestion {
  @Prop({ type: String, default: '' })
  position: string;

  @Prop({ type: String, default: '' })
  total: string;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  desc: string;

  @Prop({ type: String, default: '' })
  images: string;

  @Prop({ type: String, default: '' })
  answers: { content: string; isCorrect: boolean }[];

  @Prop({ type: String, default: '' })
  startTime: string;

  @Prop({ type: String, default: '' })
  endTime: string;

  @Prop({ type: String, default: '' })
  minTime: string;
}

export type TestQuestionDocument = TestQuestion & Document;
export const TestQuestionSchema = SchemaFactory.createForClass(TestQuestion);
