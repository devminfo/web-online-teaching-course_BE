import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import ClassRoomRepository from './class-room.repository';
import { ClassRoomDocument } from './schemas/class-room.schema';

@Injectable()
export default class ClassRoomService extends BaseService<ClassRoomDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly classRoomRepository: ClassRoomRepository,
  ) {
    super(logger, classRoomRepository);
  }
}
