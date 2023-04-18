import NotificationModule from '@common/c12-notification/notification.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import TransactionController from './transaction.controller';
import TransactionRepository from './transaction.repository';
import TransactionService from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    NotificationModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
})
export default class TransactionModule {}
