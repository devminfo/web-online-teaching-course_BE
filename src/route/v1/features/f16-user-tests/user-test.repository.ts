import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserTest, UserTestDocument } from './schemas/user-test.schema';

@Injectable()
export default class UserTestRepository extends BaseRepository<UserTestDocument> {
  constructor(
    @InjectModel(UserTest.name) model: PaginateModel<UserTestDocument>,
  ) {
    super(model);
  }
}
