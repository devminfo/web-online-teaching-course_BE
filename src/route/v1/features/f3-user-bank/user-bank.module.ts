import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserBank, UserBankSchema } from './schemas/user-bank.schema';
import UserBankController from './user-bank.controller';
import UserBankRepository from './user-bank.repository';
import UserBankService from './user-bank.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserBank.name,
        schema: UserBankSchema,
      },
    ]),
  ],
  controllers: [UserBankController],
  providers: [UserBankService, UserBankRepository],
  exports: [UserBankService, UserBankRepository],
})
export default class UserBankModule {}
