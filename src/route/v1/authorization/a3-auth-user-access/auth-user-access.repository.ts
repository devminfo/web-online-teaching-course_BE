import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AuthUserAccess, AuthUserAccessDocument } from './schemas/auth-user-access.schema';

@Injectable()
export default class AuthUserAccessRepository extends BaseRepository<AuthUserAccessDocument> {
  constructor(
    @InjectModel(AuthUserAccess.name)
      authUserAccessModel: PaginateModel<AuthUserAccessDocument>,
  ) {
    super(authUserAccessModel);
  }
}
