import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import DashboardController from './dashboard.controller';
import DashboardRepository from './dashboard.repository';
import DashboardService from './dashboard.service';
import { Dashboard, DashboardSchema } from './schemas/dashboard.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dashboard.name,
        schema: DashboardSchema,
      },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
  exports: [DashboardService, DashboardRepository],
})
export default class DashboardModule {}
