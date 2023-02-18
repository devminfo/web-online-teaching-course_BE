import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserT, UserTDocument } from './schemas/user-test.schema';

@Injectable()
export default class UserTRepository extends BaseRepository<UserTDocument> {
  constructor(@InjectModel(UserT.name) model: PaginateModel<UserTDocument>) {
    super(model);
  }
}
