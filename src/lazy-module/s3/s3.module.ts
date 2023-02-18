import { Global, Module } from '@nestjs/common';

import S3Service from './s3.service';

@Global()
@Module({
  imports: [],
  providers: [
    S3Service,
  ],
  exports: [S3Service],
})
export default class S3Module {}
