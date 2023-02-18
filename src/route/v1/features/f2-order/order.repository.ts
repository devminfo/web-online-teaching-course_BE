import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export default class OrderRepository extends BaseRepository<OrderDocument> {
  constructor(@InjectModel(Order.name) model: PaginateModel<OrderDocument>) {
    super(model);
  }
}
