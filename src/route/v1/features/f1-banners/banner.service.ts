import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import BannerRepository from './banner.repository';
import { BannerDocument } from './schemas/banner.schema';

@Injectable()
export default class BannerService extends BaseService<BannerDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly bannerRepository: BannerRepository,
  ) {
    super(logger, bannerRepository);
  }
}
