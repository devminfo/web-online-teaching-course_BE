import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import {
  FileManager, FileManagerDocument,
} from '@common/c4-file-manager/schemas/file-manager.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class FileManagerRepository extends BaseRepository<FileManagerDocument> {
  constructor(
    @InjectModel(FileManager.name) model: PaginateModel<FileManagerDocument>,
  ) {
    super(model);
  }
}
