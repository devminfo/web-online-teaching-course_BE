import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import LectureGroupController from './lecture-group.controller';
import LectureGroupRepository from './lecture-group.repository';
import LectureGroupService from './lecture-group.service';
import { LectureGroup, LectureGroupSchema } from './schemas/lecture-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LectureGroup.name,
        schema: LectureGroupSchema,
      },
    ]),
  ],
  controllers: [LectureGroupController],
  providers: [LectureGroupService, LectureGroupRepository],
  exports: [LectureGroupService, LectureGroupRepository],
})
export default class LectureGroupModule {}
