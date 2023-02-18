import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Dashboard, DashboardDocument } from './schemas/dashboard.schema';

@Injectable()
export default class dashboardRepository extends BaseRepository<DashboardDocument> {
  constructor(
    @InjectModel(Dashboard.name) model: PaginateModel<DashboardDocument>,
  ) {
    super(model);
  }
}
