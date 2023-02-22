import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestQuestion, TestQuestionSchema } from './schemas/test-question.schema';
import TestQuestionController from './test-question.controller';
import TestQuestionRepository from './test-question.repository';
import TestQuestionService from './test-question.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TestQuestion.name,
        schema: TestQuestionSchema,
      },
    ]),
  ],
  controllers: [TestQuestionController],
  providers: [TestQuestionService, TestQuestionRepository],
  exports: [TestQuestionService, TestQuestionRepository],
})
export default class TestQuestionModule {}
