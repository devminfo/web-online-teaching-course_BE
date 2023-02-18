import { Module } from '@nestjs/common';

import StaticS3Controller from './static-s3.controller';
import StaticS3Service from './static-s3.service';

@Module({
  imports: [
  ],
  providers: [
    StaticS3Service,
  ],
  controllers: [StaticS3Controller],
  exports: [StaticS3Service],
})
export default class StaticS3Module {}
