import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export default class CategoryRepository extends BaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) model: PaginateModel<CategoryDocument>,
  ) {
    super(model);
  }
}
