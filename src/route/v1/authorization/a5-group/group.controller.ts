import { Types } from 'mongoose';

import UserService from '@authorization/a1-user/user.service';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put,
  Query, UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import { AddGroupDetailDto } from './dto/add-group-detail.dto';
import { AddGroupDetailsDto } from './dto/add-group-details.dto';
import { AddUsersDto } from './dto/add-users.dto';
import CreateGroupDto from './dto/create-group.dto';
import UpdateGroupDto from './dto/update-group.dto';
import GroupService from './group.service';

@ApiTags('Group')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
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

    const result = await this.groupService.findManyBy(filter, options);
    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateGroupDto): Promise<any> {
    const result = await this.groupService.create(body);
    return result;
  }

  /**
   * Remove one detail in groups
   * @param body
   * @returns
   */
  @Put(':id/remove-group-detail')
  @HttpCode(200)
  async removeGroupDetail(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: AddGroupDetailDto,
  ): Promise<any> {
    return this.groupService.removeGroupDetail(id, body);
  }

  /**
   * Remove one detail in groups
   * @param body
   * @returns
   */
  @Put(':id/remove-group-details')
  @HttpCode(200)
  async removeGroupDetails(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: AddGroupDetailsDto,
  ): Promise<any> {
    const removePromise = body.groupDetails.map((groupDetail) => this.groupService.removeGroupDetail(id, groupDetail));

    return Promise.all(removePromise);
  }

  /**
   * Add one groupd detail to groups
   * @param body
   * @returns
   */
  @Put(':id/add-group-detail')
  @HttpCode(201)
  async addGroupDetail(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: AddGroupDetailDto,
  ): Promise<any> {
    return this.groupService.addGroupDetail(id, body);
  }

  /**
   * Add one groupd detail to groups
   * @param body
   * @returns
   */
  @Put(':id/add-group-details')
  @HttpCode(201)
  async addGroupDetails(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: AddGroupDetailsDto,
  ): Promise<any> {
    const updatePromise = body.groupDetails.map((groupDetail) => this.groupService.addGroupDetail(id, groupDetail));

    return Promise.all(updatePromise);
  }

  /**
   * Add users detail to groups
   * @param body
   * @returns
   */
  @Put(':id/update-users')
  @HttpCode(201)
  async addUsers(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: AddUsersDto,
  ): Promise<any> {
    // check group is exist
    const group = await this.groupService.findOneById(id);
    if (!group) throw new BadRequestException('Group not found.');

    // create options
    const options = body.options === 'delete' ? '$pull' : '$addToSet';

    const updatePromise = body.users.map((userId: string) => this.userService.updateGroup(userId, id, options));

    return Promise.all(updatePromise);
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
    @Body() body: UpdateGroupDto,
  ): Promise<any> {
    const result = await this.groupService.updateOneById(id, body);
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
    const pullPromises: any[] = [];

    for (let index = 0; index < listIds.length; index += 1) {
      const id = listIds[index];

      // Pull all groupApi in groupAPIAccesses from user
      const pullGroupsInUser = this.userService.updateManyBy(
        { groups: id },
        {
          $pull: { groups: id },
        },
      );
      pullPromises.push(pullGroupsInUser);
    }

    // Delete groups
    const groupsDeletedPromise = this.groupService.deleteManyHardByIds(
      ids.split(','),
    );

    return Promise.all([...pullPromises, groupsDeletedPromise]);
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
    // Pull all groupApi in groupAPIAccesses from user
    const pullGroupsInUser = this.userService.updateManyBy(
      { groups: id },
      {
        $pull: { groups: id },
      },
    );

    const groupsDeletedPromise = await this.groupService.deleteOneHardById(id);

    return Promise.all([pullGroupsInUser, groupsDeletedPromise]);
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    const result = await this.groupService.paginate(query);
    return result;
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
    const result = await this.groupService.findOneById(id, {
      populate,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
