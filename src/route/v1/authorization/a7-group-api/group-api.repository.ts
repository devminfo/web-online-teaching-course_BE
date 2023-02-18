import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GroupApi, GroupApiDocument } from './schemas/group-api.schema';

@Injectable()
export default class GroupApiRepository extends BaseRepository<GroupApiDocument> {
  constructor(
    @InjectModel(GroupApi.name)
      groupApiModel: PaginateModel<GroupApiDocument>,
  ) {
    super(groupApiModel);
  }
}
