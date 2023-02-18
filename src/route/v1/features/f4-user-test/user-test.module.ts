import UserModule from '@authorization/a1-user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserT, UserTSchema } from './schemas/user-test.schema';
import UserTController from './user-test.controller';
import UserTRepository from './user-test.repository';
import UserTService from './user-test.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserT.name,
        schema: UserTSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [UserTController],
  providers: [UserTService, UserTRepository],
  exports: [UserTService, UserTRepository],
})
export default class UserTModule {}
