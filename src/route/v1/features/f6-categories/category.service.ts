import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import CategoryRepository from './category.repository';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export default class CategoryService extends BaseService<CategoryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly categoryRepository: CategoryRepository,
  ) {
    super(logger, categoryRepository);
  }
}
