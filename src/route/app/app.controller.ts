import { Request } from 'express';

import { routerHelper } from '@helper/router.helper';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import AppService from './app.service';

@ApiTags('Welcome')
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  sayHello(): string {
    return this.appService.sayHello();
  }
}
