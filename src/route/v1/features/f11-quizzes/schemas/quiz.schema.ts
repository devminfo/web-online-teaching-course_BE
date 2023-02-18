import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Quiz {
  @Prop({ type: String, default: '' })
  readonly createdBy: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: String, default: '' })
  content: {
    questions: { text: string; image: string; file: string; audio: string };
    answer: string;
    position: string;
    createdAt: string;
  }[];

  @Prop({ type: String, default: '' })
  timeLimit: number;

  @Prop({ type: String, default: '' })
  tags: string[];
}

export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);
