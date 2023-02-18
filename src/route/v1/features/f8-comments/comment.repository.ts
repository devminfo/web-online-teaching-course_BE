import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export default class CommentRepository extends BaseRepository<CommentDocument> {
  constructor(
    @InjectModel(Comment.name) model: PaginateModel<CommentDocument>,
  ) {
    super(model);
  }
}
