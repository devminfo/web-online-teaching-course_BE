import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import QuizController from './quiz.controller';
import QuizRepository from './quiz.repository';
import QuizService from './quiz.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Quiz',
        schema: QuizSchema,
      },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
  exports: [QuizService, QuizRepository],
})
export default class QuizModule {}
