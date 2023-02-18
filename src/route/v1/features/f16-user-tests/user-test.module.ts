import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserTest, UserTestSchema } from './schemas/user-test.schema';
import UserTestController from './user-test.controller';
import UserTestRepository from './user-test.repository';
import UserTestService from './user-test.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserTest.name,
        schema: UserTestSchema,
      },
    ]),
  ],
  controllers: [UserTestController],
  providers: [UserTestService, UserTestRepository],
  exports: [UserTestService, UserTestRepository],
})
export default class UserTestModule {}
