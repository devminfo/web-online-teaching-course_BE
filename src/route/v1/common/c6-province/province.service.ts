import BaseService from '@base-inherit/base.service';
import { ProvinceDocument } from '@common/c6-province/schemas/province.schema';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import ProvinceRepository from './province.repository';

@Injectable()
export default class ProvinceService extends BaseService<ProvinceDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly provinceRepository: ProvinceRepository,
  ) {
    super(logger, provinceRepository);
  }
}
