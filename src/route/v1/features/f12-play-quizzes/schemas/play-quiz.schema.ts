import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class PlayQuiz {
  @Prop({ type: String, default: '' })
  readonly idQuiz: string;

  @Prop({ type: String, default: '' })
  readonly idUser: string;

  @Prop({ type: String, default: '' })
  readonly score: string;

  @Prop({ type: String, default: '' })
  readonly rightAnswers: number[];

  @Prop({ type: String, default: '' })
  readonly startTime: string;

  @Prop({ type: String, default: '' })
  readonly endTime: string;

  @Prop({ type: String, default: '' })
  readonly timeLimit: string;
}

export type PlayQuizDocument = PlayQuiz & Document;
export const PlayQuizSchema = SchemaFactory.createForClass(PlayQuiz);
