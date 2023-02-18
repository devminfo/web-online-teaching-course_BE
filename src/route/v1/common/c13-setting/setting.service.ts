import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { SettingDocument } from './schemas/setting.schema';
import SettingRepository from './setting.repository';

@Injectable()
export default class SettingService extends BaseService<SettingDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly settingRepository: SettingRepository,
  ) {
    super(logger, settingRepository);
  }
}
