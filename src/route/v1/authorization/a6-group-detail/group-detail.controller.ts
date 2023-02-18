import { Request as ExpressRequest, Router } from 'express';
import { Types } from 'mongoose';
import { getConnectionDb } from 'src/util/database/getConnectionDB';

import UserService from '@authorization/a1-user/user.service';
import GroupService from '@authorization/a5-group/group.service';
import { adminConstants } from '@constant/admin.constants';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { GetCurrentUserId } from '@decorator/get-current-user-id.decorator';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { RoleUserEnum } from '@enum/role-user.enum';
import { sortAndUniqueMethods } from '@helper/sort-methods';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import { GroupDetailType } from 'src/util/types';
import CreateGroupDetailDto from './dto/create-group-detail.dto';
import UpdateChildsDto from './dto/update-childs.dto';
import UpdateGroupDetailDto from './dto/update-group-detail.dto';
import GroupDetailService from './group-detail.service';

@ApiTags('GroupDetail')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class GroupDetailController {
  constructor(
    private readonly groupDetailService: GroupDetailService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@ApiQueryParams() query: AqpDto): Promise<any> {
    const {
      limit, filter, population, ...options
    } = query;
    (<any>options).populate = population;

    const result = await this.groupDetailService.findManyBy(filter, options);

    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateGroupDetailDto): Promise<any> {
    const filter = { collectionName: body.collectionName };

    // find freeApi has exist
    const result = await this.groupDetailService.findOneBy(filter);

    // if has result => result
    if (result) return result;

    // add to admin
    const newGroupDetail = await this.groupDetailService.create(body);
    const groupDetailItem: GroupDetailType = {
      idGroupDetail: newGroupDetail._id,
      accessMethods: [
        MethodRouteEnum.GET,
        MethodRouteEnum.POST,
        MethodRouteEnum.PUT,
        MethodRouteEnum.DELETE,
      ],
    };

    await this.userService.updateOneBy(
      { email: adminConstants.email },
      { $addToSet: { groupDetails: groupDetailItem } },
    );

    // create
    return newGroupDetail;
  }

  /**
   * Add childs
   * @param id
   * @param body
   * @returns
   */
  @Put(':id/add-childs')
  @HttpCode(200)
  async addChilds(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateChildsDto,
  ): Promise<any> {
    const { childs, ...rest } = body;

    const updateChildsPromise = this.groupDetailService.updateManyBy(
      { _id: { $in: childs } },
      { isChild: true },
    );
    const updateGroupDetailPromise = this.groupDetailService.updateOneById(id, {
      ...rest,
      $addToSet: { childs },
    });

    const [_, updateGroupDetail] = await Promise.all([
      updateChildsPromise,
      updateGroupDetailPromise,
    ]);

    return updateGroupDetail;
  }

  /**
   * Add childs
   * @param id
   * @param body
   * @returns
   */
  @Put(':id/remove-childs')
  @HttpCode(200)
  async removeChilds(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateChildsDto,
  ): Promise<any> {
    const { childs, ...rest } = body;

    const updateChildsPromise = this.groupDetailService.updateManyBy(
      { _id: { $in: childs } },
      { isChild: false },
    );
    const updateGroupDetailPromise = this.groupDetailService.updateOneById(id, {
      ...rest,
      $pull: { childs: { $in: childs } },
    });

    const [_, updateGroupDetail] = await Promise.all([
      updateChildsPromise,
      updateGroupDetailPromise,
    ]);

    return updateGroupDetail;
  }

  /**
   * update
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateGroupDetailDto,
  ): Promise<any> {
    const result = await this.groupDetailService.updateOneById(id, body);
    return result;
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const listIds = ids.split(',');

    const deleteAndPullInRelatedCollectionPromises: any[] = [];

    for (let index = 0; index < listIds.length; index += 1) {
      const id = listIds[index];
      deleteAndPullInRelatedCollectionPromises.push(
        this.deleteAndPullInRelatedCollection(id),
      );
    }
    return Promise.all(deleteAndPullInRelatedCollectionPromises);
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.deleteAndPullInRelatedCollection(id);
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    const result = await this.groupDetailService.paginate(query);
    return result;
  }

  /**
   * Find collection key
   *
   * @param collectionName
   * @returns
   */
  @Get('collection-key')
  async findCollectionKeyByCollectionName(
    @Query('collectionName') collectionName: string,
  ) {
    const db = getConnectionDb();

    const document = await db.collection(collectionName).findOne();

    if (document) {
      delete document.createdAt;
      delete document.updatedAt;
      return Object.keys(document);
    }

    return [];
  }

  /**
   * get all groupDetails by user in (groups, user[groupDetails])
   *
   * @param id
   * @returns
   */
  @HttpCode(200)
  @Get('get-menu-by-user-login')
  async getAllGroupDetailsOfUser(
    @GetCurrentUserId() id: Types.ObjectId,
    @ApiQueryParams() query: any,
  ) {
    const { filter, ...options } = query;

    // find user
    const user = await this.userService.findOneBy({
      _id: id,
      role: RoleUserEnum.manager,
    });

    if (!user) throw new NotFoundException('User not found.');

    const groupIds = user.groups;
    const groupDetailsInUser = user.groupDetails;

    // find groups in user
    const groups = await this.groupService.findManyBy({
      _id: { $in: groupIds },
    });

    // get groupDetails in user
    const groupDetailIdsInUser = groupDetailsInUser.map(
      (groupDetailInUser: any) => groupDetailInUser.idGroupDetail,
    );

    const groupDetailIdsInGroups: any[] = [];
    // if have groups => add groupDetails
    groups.forEach((group: any) => {
      const groupDetailIdsInGroup = group.groupDetails.map(
        (groupDetailInGroup: any) => groupDetailInGroup.idGroupDetail,
      );

      groupDetailIdsInGroups.push(...groupDetailIdsInGroup);
    });

    // Unique groupDetails ids
    const groupDetailsIdsUnique = [
      ...new Set([...groupDetailIdsInUser, ...groupDetailIdsInGroups]),
    ];

    // Update Query filter
    // eslint-disable-next-line
    query.filter._id = { $in: groupDetailsIdsUnique };

    // find group details
    const groupDetails = await this.groupDetailService.paginate(query);

    return groupDetails;
  }

  /**
   * regenerateGroupDetail
   * @returns
   */
  @Get('regenerate')
  @HttpCode(200)
  async regenerateGroupDetail(@Request() req: ExpressRequest): Promise<any> {
    const router = req.app._router as Router;
    return this.groupDetailService.seed(router);
  }

  /**
   * getAccessMethodsOfUserLoggedInByCollectionName
   * @param id
   * @returns
   */
  @Get('access-methods-user')
  @HttpCode(200)
  async getAccessMethodsOfUserLoggedInByCollectionName(
    @GetCurrentUserId() id: Types.ObjectId,
    @Query('link') link: string,
  ): Promise<any> {
    //  Get accessMethods in user
    let accessMethods: any[] = [];

    const [groupDetail, user] = await Promise.all([
      this.groupDetailService.findOneBy({ link }, { projection: '_id' }),
      this.userService.findOneById(id),
    ]);

    if (!user || !groupDetail) throw new NotFoundException('Resource not found.');
    const { groups, groupDetails } = user;

    // check groups details
    const groupDetailsExist = groupDetails.find(
      (item) => item.idGroupDetail.toString() === groupDetail._id.toString(),
    );

    if (groupDetailsExist) {
      accessMethods = sortAndUniqueMethods(groupDetailsExist.accessMethods);

      if (accessMethods.length === 4) return accessMethods;
    }

    // check groups
    if (groups.length > 0) {
      const groupExist = await this.groupService.findOneBy({
        $and: [
          { _id: { $in: groups } },
          { 'groupDetails.idGroupDetail': groupDetail._id },
        ],
      });

      if (groupExist) {
        const groupDetailInGroup = groupExist.groupDetails.find(
          (item: any) => item.idGroupDetail.toString() === groupDetail._id.toString(),
        );

        // update access methods
        accessMethods = sortAndUniqueMethods([
          ...accessMethods,
          ...sortAndUniqueMethods(groupDetailInGroup.accessMethods),
        ]);

        return { accessMethods };
      }
    }

    return accessMethods;
  }

  /**
   * findOneById
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.groupDetailService.findOneById(id, {
      populate,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }

  /**
   * Delete group detail and pull group details in related collection
   * @param id
   * @returns
   */
  async deleteAndPullInRelatedCollection(id: Types.ObjectId) {
    // check group detail has exist
    const groupDetail = await this.groupDetailService.findOneById(id);

    if (!groupDetail) throw new NotFoundException('Group detail not found.');

    const pullGroupDetailsPromise: any[] = [];

    // move child to main
    if (groupDetail.childs.length >= 0) {
      pullGroupDetailsPromise.push(
        this.groupDetailService.moveChildToMain(groupDetail.childs),
      );
    }

    // Pull all idGroupDetails in groupDetails from groups
    const pullInGroup = this.groupService.updateManyBy(
      { 'groupDetails.idGroupDetail': id },
      {
        $pull: { groupDetails: { idGroupDetail: id } },
      },
    );

    // Pull all idGroupDetails in groupDetails from users
    const pullInUser = this.userService.updateManyBy(
      { 'groupDetails.idGroupDetail': id },
      {
        $pull: { groupDetails: { idGroupDetail: id } },
      },
    );

    // Pull all idGroupDetail in childs from groupDetails
    const pullInGroupDetail = this.groupDetailService.updateManyBy(
      { childs: id },
      {
        $pull: { childs: id },
      },
    );

    const deletedPromise = this.groupDetailService.deleteOneHardById(id);

    pullGroupDetailsPromise.push(pullInGroup, pullInUser, pullInGroupDetail);

    return Promise.all([...pullGroupDetailsPromise, deletedPromise]);
  }
}
