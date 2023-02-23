import { Document } from 'mongoose';
import { QuizContentDto } from 'src/util/types/dto/quiz-content.dto';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class TestQuestion {
  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: Number, default: 0 })
  readonly total: number;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: [String], default: [] })
  readonly images: string[];

  @Prop({
    type: [
      {
        questions: {
          text: String,
          image: String,
          file: String,
          audio: String,
        },
        correctAnswer: String,
        incorrectAnswers: [String],
        position: Number,
      },
    ],
    default: [],
  })
  readonly content: QuizContentDto[];

  @Prop({ type: Number, default: 0 })
  readonly startTime: number;

  @Prop({ type: Number, default: 0 })
  readonly endTime: number;

  @Prop({ type: Number, default: 0 })
  readonly minTime: number;
}

export type TestQuestionDocument = TestQuestion & Document;
export const TestQuestionSchema = SchemaFactory.createForClass(TestQuestion);
