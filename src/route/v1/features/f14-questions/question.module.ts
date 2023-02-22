import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import QuestionController from './question.controller';
import QuestionRepository from './question.repository';
import QuestionService from './question.service';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService, QuestionRepository],
})
export default class QuestionModule {}
