import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import DashboardRepository from './dashboard.repository';
import { DashboardDocument } from './schemas/dashboard.schema';

@Injectable()
export default class DashboardService extends BaseService<DashboardDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly dashboardRepository: DashboardRepository,
  ) {
    super(logger, dashboardRepository);
  }
}
