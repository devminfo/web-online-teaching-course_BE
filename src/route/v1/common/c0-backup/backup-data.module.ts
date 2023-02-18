import MailerModule from '@lazy-module/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import BackupDataController from './backup-data.controller';
import BackupDataRepository from './backup-data.repository';
import BackupDataService from './backup-data.service';
import { BackupData, BackupDataSchema } from './schemas/backup-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BackupData.name,
        schema: BackupDataSchema,
      },
    ]),
    MailerModule,
  ],
  controllers: [BackupDataController],
  providers: [BackupDataService, BackupDataRepository],
  exports: [BackupDataService, BackupDataRepository],
})
export default class BackupDataModule {}
