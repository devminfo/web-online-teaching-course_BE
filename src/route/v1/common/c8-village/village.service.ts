import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { VillageDocument } from './schemas/village.schema';
import VillageRepository from './village.repository';

@Injectable()
export default class VillageService extends BaseService<VillageDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly provinceRepository: VillageRepository,
  ) {
    super(logger, provinceRepository);
  }
}
