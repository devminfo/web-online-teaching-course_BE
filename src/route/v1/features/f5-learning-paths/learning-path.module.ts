import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import LearningPathController from './learning-path.controller';
import LearningPathRepository from './learning-path.repository';
import LearningPathService from './learning-path.service';
import { LearningPath, LearningPathSchema } from './schemas/learning-path.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LearningPath.name,
        schema: LearningPathSchema,
      },
    ]),
  ],
  controllers: [LearningPathController],
  providers: [LearningPathService, LearningPathRepository],
  exports: [LearningPathService, LearningPathRepository],
})
export default class LearningPathModule {}
