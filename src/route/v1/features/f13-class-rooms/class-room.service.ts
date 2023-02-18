import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { ClassRoomDocument } from './schemas/class-room.schema';
import ClassRoomRepository from './class-room.repository';

@Injectable()
export default class ClassRoomService extends BaseService<ClassRoomDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly classRoomRepository: ClassRoomRepository,
  ) {
    super(logger, classRoomRepository);
  }
}
