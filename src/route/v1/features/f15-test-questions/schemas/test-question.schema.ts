import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuizContentDto } from 'src/util/types/dto/quiz-content.dto';

@Schema({ timestamps: true, versionKey: false })
export class TestQuestion {
  @Prop({ type: Number, default: 0 })
  position: number;

  @Prop({ type: Number, default: 0 })
  total: number;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  desc: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({
    type: [
      {
        questions: {
          text: String, image: String, file: String, audio: String,
        },
        correctAnswer: String,
        incorrectAnswers: [String],
        position: Number,
      },
    ],
    default: [],
  })
  content: QuizContentDto[];

  @Prop({ type: Number, default: 0 })
  startTime: number;

  @Prop({ type: Number, default: 0 })
  endTime: number;

  @Prop({ type: Number, default: 0 })
  minTime: number;
}

export type TestQuestionDocument = TestQuestion & Document;
export const TestQuestionSchema = SchemaFactory.createForClass(TestQuestion);
