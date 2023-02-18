import FreeApiRepository from '@authorization/a2-free-api/free-api.repository';
import AuthUserAccessRepository from '@authorization/a3-auth-user-access/auth-user-access.repository';
import AuthUserIdRepository from '@authorization/a4-auth-user-id/auth-user-id.repository';
import BaseService from '@base-inherit/base.service';
import { routerHelper } from '@helper/router.helper';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import GroupApiRepository from './group-api.repository';
import { GroupApiDocument } from './schemas/group-api.schema';

@Injectable()
export default class GroupApiService extends BaseService<GroupApiDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly groupAPIRepository: GroupApiRepository,
    readonly freeApiRepository: FreeApiRepository,
    readonly authUserAccessRepository: AuthUserAccessRepository,
    readonly authUserIdRepository: AuthUserIdRepository,
  ) {
    super(logger, groupAPIRepository);
  }

  /**
   * Auto create all groupApis
   * @param _router
   * @returns
   */
  async seed(_router: any): Promise<any> {
    // await this.groupAPIRepository.deleteManyHard({});
    const groupApiItems = routerHelper.getResourceFromRouter(_router);

    // upsert group api items promise
    const upsertGroupApisPromise = groupApiItems.map((groupApi) => {
      return this.groupAPIRepository.upsertOneBy({
        url: groupApi.url,
        accessMethods: groupApi.methods,
        collectionName: groupApi.collectionName,
      });
    });

    // run promise
    await Promise.all(upsertGroupApisPromise);

    this.logger.log('Seed groupAPIs', {
      message: 'Seed for successful groupAPIs.',
    });
  }

  /**
   * Reset group apis
   *
   * @param router
   */
  async resetGroupApis(router: any) {
    await Promise.all([
      this.groupAPIRepository.deleteManyHard({}),
      this.freeApiRepository.deleteManyHard({}),
      this.authUserIdRepository.deleteManyHard({}),
      this.authUserAccessRepository.deleteManyHard({}),
    ]);

    await this.seed(router);
  }
}
