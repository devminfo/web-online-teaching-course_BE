import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GroupDetail, GroupDetailDocument } from './schemas/group-detail.schema';

@Injectable()
export default class GroupDetailRepository extends BaseRepository<GroupDetailDocument> {
  constructor(
    @InjectModel(GroupDetail.name)
      groupDetailModel: PaginateModel<GroupDetailDocument>,
  ) {
    super(groupDetailModel);
  }
}
