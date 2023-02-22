import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import PlayQuizRepository from './play-quiz.repository';
import { PlayQuizDocument } from './schemas/play-quiz.schema';

@Injectable()
export default class PlayQuizService extends BaseService<PlayQuizDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly playQuizRepository: PlayQuizRepository,
  ) {
    super(logger, playQuizRepository);
  }
}
