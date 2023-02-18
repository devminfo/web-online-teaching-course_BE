import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import HistoryController from './history.controller';
import HistoryRepository from './history.repository';
import HistoryService from './history.service';
import { History, HistorySchema } from './schemas/history.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema,
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
  exports: [HistoryService, HistoryRepository],
})
export default class HistoryModule {}
