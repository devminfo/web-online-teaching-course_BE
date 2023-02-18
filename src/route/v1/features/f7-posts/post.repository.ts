import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export default class PostRepository extends BaseRepository<PostDocument> {
  constructor(@InjectModel(Post.name) model: PaginateModel<PostDocument>) {
    super(model);
  }
}
