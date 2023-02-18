import BaseService from '@base-inherit/base.service';
import { MethodRouteEnum } from '@enum/method-route.enum';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import AuthUserIdRepository from './auth-user-id.repository';
import { AuthUserIdDocument } from './schemas/auth-user-id.schema';

@Injectable()
export default class AuthUserIdService extends BaseService<AuthUserIdDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly endpointAPIRepository: AuthUserIdRepository,
  ) {
    super(logger, endpointAPIRepository);
  }

  /**
   * Find authUserId by "Url","Method"
   * @param url
   * @param method
   * @return Promise<any>
   */
  public async findOneByUrlAndMethod(
    url: String,
    method: MethodRouteEnum,
  ): Promise<any> {
    return this.baseRepository.findOneBy({ url, accessMethods: method });
  }

  /**
   * Check "Url","Method" exist in collection
   * @param url
   * @param method
   * @return Promise<boolean>
   */
  public async checkExistAuthUserId(
    url: String,
    method: MethodRouteEnum,
    referId: String,
  ): Promise<Boolean> {
    const count = await this.baseRepository.findAndCount({
      url,
      accessMethods: method,
      referId,
    });

    return count >= 1;
  }
}
