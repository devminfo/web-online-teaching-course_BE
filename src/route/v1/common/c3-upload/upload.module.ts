import UserModule from '@authorization/a1-user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import UploadLocalService from './upload-local.service';
import UploadS3Service from './upload-s3.service';
import UploadController from './upload.controller';
import UploadRepository from './upload.repository';

@Module({
  imports: [UserModule, PassportModule],
  providers: [UploadS3Service, UploadRepository, UploadLocalService],
  controllers: [UploadController],
  exports: [UploadS3Service, UploadRepository, UploadLocalService],
})
export default class UploadModule {}
