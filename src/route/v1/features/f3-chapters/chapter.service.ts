import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import ChapterRepository from './chapter.repository';
import { ChapterDocument } from './schemas/chapter.schema';

@Injectable()
export default class ChapterService extends BaseService<ChapterDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly chapterRepository: ChapterRepository,
  ) {
    super(logger, chapterRepository);
  }
}
