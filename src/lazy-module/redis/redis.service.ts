import Redis from 'ioredis';

import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class RedisService {
  private redis: Redis.Redis | undefined;

  constructor(
    private logger: CustomLoggerService,
  ) {
    this.init();
  }

  init() {
    if (ShareFunction.isConfigRedis()) {
      this.redis = new Redis(ShareFunction.env().REDIS_URL);
      this.redis.on('ready', () => {
        this.logger.log('RedisModule is init success');
      });
      this.redis.on('error', (e) => {
        this.logger.error('RedisModule error', e);
      });
      this.redis.on('restart', () => {
        this.logger.log('RedisModule to restart the redis server');
      });
    } else {
      this.logger.warn('REDIS_URL was not found, RedisModule was not init');
    }
  }
}
