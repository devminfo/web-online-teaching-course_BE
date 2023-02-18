import { Types } from 'mongoose';

import GroupDetailRepository from '@authorization/a6-group-detail/group-detail.repository';
import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import GroupRepository from './group.repository';
import { GroupDocument } from './schemas/group.schema';

@Injectable()
export default class GroupService extends BaseService<GroupDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly groupRepository: GroupRepository,
    readonly groupDetailRepository: GroupDetailRepository,
  ) {
    super(logger, groupRepository);
  }

  /**
   * Add group details
   *
   * @param id
   * @param body
   * @returns
   */
  async addGroupDetail(id: Types.ObjectId, body: any) {
    // check group details exist
    const groupDetail = await this.groupDetailRepository.findOneById(
      body.idGroupDetail,
    );

    if (!groupDetail) throw new NotFoundException('Group details not found.');

    // add groupDetail
    const existGroup = await this.findOneBy({
      _id: id,
      groupDetails: {
        $elemMatch: {
          idGroupDetail: body.idGroupDetail,
          accessMethods: body.accessMethods,
        },
      },
    });

    if (existGroup) throw new BadRequestException('Group details already exist.');

    return this.updateOneById(id, {
      $addToSet: { groupDetails: body },
    });
  }

  /**
   * Remove group details
   *
   * @param id
   * @param body
   * @returns
   */
  async removeGroupDetail(id: Types.ObjectId, body: any) {
    return this.updateOneBy(
      {
        _id: id,
        groupDetails: {
          $elemMatch: {
            idGroupDetail: body.idGroupDetail,
            accessMethods: body.accessMethods,
          },
        },
      },
      {
        $pull: { groupDetails: body },
      },
    );
  }

  /**
   * Generate supper group full permission
   */
  async generateSupperGroup() {
    // Delete supper-group
    await this.groupRepository.deleteManyHard({ name: 'supper-group' });

    // find all group details
    const groupDetails = await this.groupDetailRepository.findManyBy({});

    // get groupDetails for fields in group
    const listGroupDetailsForGroup = groupDetails.map((groupDetail: any) => {
      return {
        idGroupDetail: groupDetail._id,
        accessMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      };
    });

    // Upser
    return this.groupRepository.create({
      name: 'supper-group',
      groupDetails: listGroupDetailsForGroup,
      groupAPIAccesses: [],
      groupAPIDenines: [],
    });
  }

  /**
   * Reset all group permission and generate supper group
   *
   * @returns
   */
  async resetAllGroupPermission() {
    await this.groupRepository.updateManyBy(
      {},
      {
        groupDetails: [],
        groupAPIAccesses: [],
        groupAPIDenines: [],
      },
    );

    return this.generateSupperGroup();
  }
}
