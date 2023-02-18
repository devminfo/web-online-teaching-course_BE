import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { BackupData, BackupDataDocument } from './schemas/backup-data.schema';

@Injectable()
export default class BackupDataRepository extends BaseRepository<BackupDataDocument> {
  private backupDataModel: PaginateModel<BackupDataDocument>;

  constructor(
    @InjectModel(BackupData.name) model: PaginateModel<BackupDataDocument>,
  ) {
    super(model);
    this.backupDataModel = model;
  }
}
