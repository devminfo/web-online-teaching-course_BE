import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Quiz, QuizSchema } from './schemas/quiz.schema';
import QuizController from './quiz.controller';
import QuizRepository from './quiz.repository';
import QuizService from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quiz.name,
        schema: QuizSchema,
      },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
  exports: [QuizService, QuizRepository],
})
export default class QuizModule {}
