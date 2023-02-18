import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AuthUserId, AuthUserIdDocument } from './schemas/auth-user-id.schema';

@Injectable()
export default class AuthUserIdRepository extends BaseRepository<AuthUserIdDocument> {
  constructor(
    @InjectModel(AuthUserId.name)
      authUserIdModel: PaginateModel<AuthUserIdDocument>,
  ) {
    super(authUserIdModel);
  }
}
