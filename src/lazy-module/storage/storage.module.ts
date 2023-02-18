import { Global, Module } from '@nestjs/common';

import StorageService from './storage.service';

@Global()
@Module({
  imports: [],
  providers: [
    StorageService,
  ],
  exports: [StorageService],
})
export default class StorageModule {}
