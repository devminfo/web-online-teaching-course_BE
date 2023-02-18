import MailerModule from '@lazy-module/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import OtpController from './otp.controller';
import OtpRepository from './otp.repository';
import OtpService from './otp.service';
import { Otp, OtpSchema } from './schemas/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Otp.name,
        schema: OtpSchema,
      },
    ]),
    MailerModule,
  ],
  controllers: [OtpController],
  providers: [OtpService, OtpRepository],
  exports: [OtpService, OtpRepository],
})
export default class OtpModule {}
