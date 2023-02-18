import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import AddressHistoryController from './address-history.controller';
import AddressHistoryRepository from './address-history.repository';
import AddressHistoryService from './address-history.service';
import {
  AddressHistory,
  AddressHistorySchema,
} from './schemas/address-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AddressHistory.name,
        schema: AddressHistorySchema,
      },
    ]),
  ],
  controllers: [AddressHistoryController],
  providers: [AddressHistoryService, AddressHistoryRepository],
  exports: [AddressHistoryService, AddressHistoryRepository],
})
export default class AddressHistoryModule {}
