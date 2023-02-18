import BaseService from '@base-inherit/base.service';
import FileManagerService from '@common/c4-file-manager/file-manager.service';
import { routerHelper } from '@helper/router.helper';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import GroupDetailRepository from './group-detail.repository';
import { GroupDetailDocument } from './schemas/group-detail.schema';

@Injectable()
export default class GroupDetailService extends BaseService<GroupDetailDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly groupDetailRepository: GroupDetailRepository,
    readonly fileManagerService: FileManagerService,
  ) {
    super(logger, groupDetailRepository);
  }

  /**
   * Auto create all group details
   * @param _router
   */
  async seed(_router: any): Promise<any> {
    // await this.groupDetailRepository.deleteManyHard({});
    const resourceList = routerHelper.getResourceFromRouter(_router);

    const groupDetailsMap = new Map<String, Promise<any>>();

    resourceList.forEach((resource) => {
      const { collectionName } = resource;

      const isGroupDetailExist = groupDetailsMap.get(collectionName);

      if (!isGroupDetailExist && collectionName) {
        groupDetailsMap.set(
          collectionName,
          this.fileManagerService.getRefersInCollection(
            _router,
            collectionName,
          ),
        );
      }
    });

    // create upserGroup details promise
    const upsertGroupDetailsPromise = [...groupDetailsMap].map(
      async (groupDetails, index) => {
        const collectionName = groupDetails[0];
        const refers = await groupDetails[1];

        const item = {
          collectionName,
          refers,
          position: index + 1,
          name: `Manager ${collectionName}`,
          // Các thông số này không cần phải gen lại
          // isGroup: false,
          // childs: [],
          // isChild: false,
          // icon: './assets/media/icons/duotune/general/gen019.svg',
          link: `/features/${collectionName}`,
        };
        const groupDetailExist = await this.groupDetailRepository.findOneBy({
          collectionName,
        });

        if (!groupDetailExist) return this.groupDetailRepository.create(item);
      },
    );

    // // run upsertGroupDetailsPromise
    await Promise.all(upsertGroupDetailsPromise);
    this.logger.log('Seed groupDetails', {
      message: 'Seed for successful groupDetails.',
    });
  }

  /**
   * Reset group details
   *
   * @param router
   */
  async resetGroupDetails(router: any) {
    await this.groupDetailRepository.deleteManyHard({});

    await this.seed(router);
  }

  /**
   * Move child in group to main
   */
  async moveChildToMain(ids: any[]) {
    return this.groupDetailRepository.updateManyBy(
      { _id: { $in: ids } },
      {
        isChild: false,
      },
    );
  }
}
