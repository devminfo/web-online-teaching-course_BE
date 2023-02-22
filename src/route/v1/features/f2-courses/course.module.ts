import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CourseController from './course.controller';
import CourseRepository from './course.repository';
import CourseService from './course.service';
import { CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService, CourseRepository],
})
export default class CourseModule {}
