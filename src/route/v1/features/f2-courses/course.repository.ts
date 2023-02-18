import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export default class CourseRepository extends BaseRepository<CourseDocument> {
  constructor(@InjectModel(Course.name) model: PaginateModel<CourseDocument>) {
    super(model);
  }
}
