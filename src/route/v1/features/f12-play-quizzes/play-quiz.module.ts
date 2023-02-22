import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import PlayQuizController from './play-quiz.controller';
import PlayQuizRepository from './play-quiz.repository';
import PlayQuizService from './play-quiz.service';
import { PlayQuiz, PlayQuizSchema } from './schemas/play-quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PlayQuiz.name,
        schema: PlayQuizSchema,
      },
    ]),
  ],
  controllers: [PlayQuizController],
  providers: [PlayQuizService, PlayQuizRepository],
  exports: [PlayQuizService, PlayQuizRepository],
})
export default class PlayQuizModule {}
