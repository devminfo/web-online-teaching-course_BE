import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { PostDocument } from './schemas/post.schema';
import PostRepository from './post.repository';

@Injectable()
export default class PostService extends BaseService<PostDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly postRepository: PostRepository,
  ) {
    super(logger, postRepository);
  }
}
