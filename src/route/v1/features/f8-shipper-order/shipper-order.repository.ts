import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ShipperOrderDocument,
  ShipperOrder,
} from './schemas/shipper-order.schema';

@Injectable()
export default class ShipperOrderRepository extends BaseRepository<ShipperOrderDocument> {
  constructor(
    @InjectModel(ShipperOrder.name)
      model: PaginateModel<ShipperOrderDocument>,
  ) {
    super(model);
  }
}
