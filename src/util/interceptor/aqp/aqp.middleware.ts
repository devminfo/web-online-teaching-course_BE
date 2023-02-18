// https://www.npmjs.com/package/api-query-params
import aqp from 'api-query-params';
import { NextFunction, Request, Response } from 'express';

import AqpDto from '@interceptor/aqp/aqp.dto';
import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

import { validatorDto } from './aqp.validator';

@Injectable()
export default class AQPMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Remove key query projection by key: "fields" in API-Query-Params
    if (
      req.query.fields
      && (req.query.fields as string).includes('password')
    ) {
      throw new BadRequestException('Fields cannot access passwords');
    }

    // Convert req.query to api-query-params
    const query: any = aqp(req.query, { skipKey: 'page' });

    // Validate params
    try {
      await validatorDto(AqpDto, query);
    } catch (e) {
      next(e);
    }

    // @ts-ignore
    req.aqp = query;
    next();
  }
}
