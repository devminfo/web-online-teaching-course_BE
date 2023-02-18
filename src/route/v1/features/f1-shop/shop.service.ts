import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { ShopDocument } from './schemas/shop.schema';
import ShopRepository from './shop.repository';

@Injectable()
export default class ShopService extends BaseService<ShopDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly shopRepository: ShopRepository,
  ) {
    super(logger, shopRepository);
  }
}
