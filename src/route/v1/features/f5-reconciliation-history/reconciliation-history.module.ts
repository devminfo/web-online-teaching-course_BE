import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ReconciliationHistory,
  ReconciliationHistorySchema,
} from './schemas/reconciliation-history.schema';
import ReconciliationHistoryController from './reconciliation-history.controller';
import ReconciliationHistoryRepository from './reconciliation-history.repository';
import ReconciliationHistoryService from './reconciliation-history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ReconciliationHistory.name,
        schema: ReconciliationHistorySchema,
      },
    ]),
  ],
  controllers: [ReconciliationHistoryController],
  providers: [ReconciliationHistoryService, ReconciliationHistoryRepository],
  exports: [ReconciliationHistoryService, ReconciliationHistoryRepository],
})
export default class ReconciliationHistoryModule {}
