import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { CommentDocument } from './schemas/comment.schema';
import CommentRepository from './comment.repository';

@Injectable()
export default class CommentService extends BaseService<CommentDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly commentRepository: CommentRepository,
  ) {
    super(logger, commentRepository);
  }
}
