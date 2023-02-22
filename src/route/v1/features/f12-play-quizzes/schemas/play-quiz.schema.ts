import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class PlayQuiz {
  @Prop({ type: String, ref: 'Quiz' })
  readonly quiz: string;

  @Prop({ type: String, ref: 'User' })
  readonly user: string;

  @Prop({ type: Number, default: 0 })
  readonly score: number;

  @Prop({ type: [String], default: [] })
  readonly rightAnswers: string[];

  @Prop({ type: Number, default: 0 })
  readonly totalQuestions: number;

  @Prop({ type: Number, default: 0 })
  readonly startTime: number;

  @Prop({ type: Number, default: 0 })
  readonly endTime: number;

  @Prop({ type: Number, default: 0 })
  readonly timeLimit: number;
}

export type PlayQuizDocument = PlayQuiz & Document;
export const PlayQuizSchema = SchemaFactory.createForClass(PlayQuiz);
