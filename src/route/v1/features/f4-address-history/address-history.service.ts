import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import AddressHistoryRepository from './address-history.repository';
import { AddressHistoryDocument } from './schemas/address-history.schema';

@Injectable()
export default class AddressHistoryService extends BaseService<AddressHistoryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly addressHistoryRepository: AddressHistoryRepository,
  ) {
    super(logger, addressHistoryRepository);
  }
}
