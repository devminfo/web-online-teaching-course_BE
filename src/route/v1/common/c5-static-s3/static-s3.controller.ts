import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import StaticS3Service from '@common/c5-static-s3/static-s3.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  Controller, Get, Request, Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Static')
@Controller()
export default class StaticS3Controller {
  constructor(
    private logger: CustomLoggerService,
    private staticS3Service: StaticS3Service,
  ) {}

  @Get('*')
  async serveFileFromS3(
    @Request() req: ExpressRequest,
    @Res() res: ExpressResponse,
  ) {
    return this.staticS3Service.serveFileFromS3(req, res, req.originalUrl);
  }
}
