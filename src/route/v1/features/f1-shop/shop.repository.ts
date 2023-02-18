import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Shop, ShopDocument } from './schemas/shop.schema';

@Injectable()
export default class ShopRepository extends BaseRepository<ShopDocument> {
  constructor(@InjectModel(Shop.name) model: PaginateModel<ShopDocument>) {
    super(model);
  }
}
