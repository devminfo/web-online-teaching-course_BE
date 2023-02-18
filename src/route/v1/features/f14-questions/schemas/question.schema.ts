import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Question {
  @Prop({ type: String, default: '' })
  readonly author: string;

  @Prop({ type: String, default: '' })
  readonly type: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: String, default: '' })
  readonly images: string;

  @Prop({ type: String, default: '' })
  readonly totalLikes: string;

  @Prop({ type: String, default: '' })
  readonly totalViews: string;

  @Prop({ type: String, default: '' })
  readonly answers: { author: string; content: string; likes: string[] }[];
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
