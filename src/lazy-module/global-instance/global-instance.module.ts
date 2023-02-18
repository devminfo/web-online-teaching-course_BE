import { Global, Module } from '@nestjs/common';

import GlobalInstanceService from './global-instance.service';

@Global()
@Module({
  imports: [],
  providers: [
    GlobalInstanceService,
  ],
  exports: [GlobalInstanceService],
})
export default class GlobalInstanceModule {}
