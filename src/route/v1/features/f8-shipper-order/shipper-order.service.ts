import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ShipperOrderDocument } from './schemas/shipper-order.schema';
import ShipperOrderRepository from './shipper-order.repository';

@Injectable()
export default class ShipperOrderService extends BaseService<ShipperOrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly shipperOrderRepository: ShipperOrderRepository,
  ) {
    super(logger, shipperOrderRepository);
  }
}
