import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { PlayQuizDocument } from './schemas/play-quiz.schema';
import PlayQuizRepository from './play-quiz.repository';

@Injectable()
export default class PlayQuizService extends BaseService<PlayQuizDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly playQuizRepository: PlayQuizRepository,
  ) {
    super(logger, playQuizRepository);
  }
}
