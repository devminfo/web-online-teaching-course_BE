import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Banner, BannerDocument } from './schemas/banner.schema';

@Injectable()
export default class BannerRepository extends BaseRepository<BannerDocument> {
  constructor(@InjectModel(Banner.name) model: PaginateModel<BannerDocument>) {
    super(model);
  }
}
