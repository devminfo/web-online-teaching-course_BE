import { Document } from 'mongoose';
import { AnswerDto } from 'src/util/types/dto/answer.dto';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Question {
  @Prop({ type: String, ref: 'User' })
  readonly author: string;

  @Prop({ type: String, default: '' })
  readonly type: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: String, default: '' })
  readonly images: string[];

  @Prop({ type: Number, default: 0 })
  readonly totalViews: number;

  @Prop({
    type: {
      author: { type: String, ref: 'User' },
      content: String,
      likes: { type: [{ type: String, ref: 'User' }], default: [] },
    },
    default: [],
  })
  readonly answers: AnswerDto[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly likes: string[];
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
