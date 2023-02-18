import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import FreeApiRepository from './free-api.repository';
import { FreeApiDocument } from './schemas/free-api.schema';

@Injectable()
export default class FreeApiService extends BaseService<FreeApiDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly endpointAPIRepository: FreeApiRepository,
  ) {
    super(logger, endpointAPIRepository);
  }
}
