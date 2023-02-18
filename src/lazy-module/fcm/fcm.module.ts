import UserModule from '@authorization/a1-user/user.module';
import { Global, Module } from '@nestjs/common';

import FcmService from './fcm.service';

@Global()
@Module({
  imports: [UserModule],
  providers: [FcmService],
  exports: [FcmService],
})
export default class FcmModule {}
