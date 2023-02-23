import { Document } from 'mongoose';
import { QuizContentDto } from 'src/util/types/dto/quiz-content.dto';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Quiz {
  @Prop({ type: String, ref: 'User' })
  readonly createdBy: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

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
  content: QuizContentDto[];

  @Prop({ type: Number, default: 0 })
  timeLimit: number;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);
