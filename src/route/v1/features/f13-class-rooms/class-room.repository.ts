import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ClassRoom, ClassRoomDocument } from './schemas/class-room.schema';

@Injectable()
export default class ClassRoomRepository extends BaseRepository<ClassRoomDocument> {
  constructor(
    @InjectModel(ClassRoom.name) model: PaginateModel<ClassRoomDocument>,
  ) {
    super(model);
  }
}
