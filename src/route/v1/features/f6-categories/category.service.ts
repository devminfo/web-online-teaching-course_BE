import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { CategoryDocument } from './schemas/category.schema';
import CategoryRepository from './category.repository';

@Injectable()
export default class CategoryService extends BaseService<CategoryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly categoryRepository: CategoryRepository,
  ) {
    super(logger, categoryRepository);
  }
}
