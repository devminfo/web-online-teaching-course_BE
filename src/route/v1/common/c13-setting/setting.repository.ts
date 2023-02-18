import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Setting, SettingDocument } from './schemas/setting.schema';

@Injectable()
export default class SettingRepository extends BaseRepository<SettingDocument> {
  constructor(
    @InjectModel(Setting.name) model: PaginateModel<SettingDocument>,
  ) {
    super(model);
  }
}
