import { ConsoleLogger, Global, Module } from '@nestjs/common';

import CustomLoggerService from './logger.service';

@Global()
@Module({
  imports: [],
  providers: [
    CustomLoggerService,
    ConsoleLogger,
  ],
  exports: [CustomLoggerService],
})
export default class CustomLoggerModule {}
