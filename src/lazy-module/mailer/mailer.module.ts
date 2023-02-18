import { Global, Module } from '@nestjs/common';

import MailerService from './mailer.service';

@Global()
@Module({
  imports: [],
  providers: [
    MailerService,
  ],
  exports: [MailerService],
})
export default class MailerModule {}
