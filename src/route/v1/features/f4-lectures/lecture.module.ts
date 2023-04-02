import ChapterModule from '@features/f3-chapters/chapter.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import LectureController from './lecture.controller';
import LectureRepository from './lecture.repository';
import LectureService from './lecture.service';
import { Lecture, LectureSchema } from './schemas/lecture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lecture.name,
        schema: LectureSchema,
      },
    ]),
    ChapterModule,
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository],
  exports: [LectureService, LectureRepository],
})
export default class LectureModule {}
