import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ChapterController from './chapter.controller';
import ChapterRepository from './chapter.repository';
import ChapterService from './chapter.service';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository],
  exports: [ChapterService, ChapterRepository],
})
export default class ChapterModule {}
