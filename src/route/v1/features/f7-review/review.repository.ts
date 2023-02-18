import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export default class ReviewRepository extends BaseRepository<ReviewDocument> {
  constructor(@InjectModel(Review.name) model: PaginateModel<ReviewDocument>) {
    super(model);
  }
}
