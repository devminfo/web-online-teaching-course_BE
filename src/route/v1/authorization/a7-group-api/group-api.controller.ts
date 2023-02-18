import { Types } from 'mongoose';

import UserService from '@authorization/a1-user/user.service';
import GroupService from '@authorization/a5-group/group.service';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { routerHelper } from '@helper/router.helper';
import { sortAndUniqueMethods } from '@helper/sort-methods';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import CreateGroupApiDto from './dto/create-group-api.dto';
import UpdateGroupApiDto from './dto/update-group-api.dto';
import GroupApiService from './group-api.service';

@ApiTags('GroupApi')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class GroupApiController {
  constructor(
    private readonly groupApiService: GroupApiService,
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

    const result = await this.groupApiService.findManyBy(filter, options);
    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateGroupApiDto): Promise<any> {
    const item = {
      ...body,
      accessMethods: sortAndUniqueMethods(body.accessMethods),
      url: routerHelper.updateValidUrl(body.url),
      collectionName: routerHelper.getCollectionNameByUrl(body.url),
    };

    // find groupApi
    const result = await this.groupApiService.findOneBy({
      accessMethods: item.accessMethods,
      url: item.url,
    });

    // if has result => result
    if (result) return result;

    // create
    return this.groupApiService.create(item);
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
    @Body() body: UpdateGroupApiDto,
  ): Promise<any> {
    const result = await this.groupApiService.updateOneById(id, body);
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

      // Pull all groupApi in groupAPIAccesses from groups
      const pullGroupAPIAccessesInGroup = this.groupService.updateManyBy(
        { groupAPIAccesses: id },
        {
          $pull: { groupAPIAccesses: id },
        },
      );

      // Pull all groupApi in groupAPIDenines from groups
      const pullGroupAPIDeniesInGroup = this.groupService.updateManyBy(
        { groupAPIDenines: id },
        {
          $pull: { groupAPIDenines: id },
        },
      );

      // Pull all groupApi in groupAPIAccesses from user
      const pullGroupAPIAccessesInUser = this.userService.updateManyBy(
        { groupAPIAccesses: id },
        {
          $pull: { groupAPIAccesses: id },
        },
      );

      // Pull all groupApi in groupAPIAccesses from user
      const pullGroupAPIDeniesInUser = this.userService.updateManyBy(
        { groupAPIDenines: id },
        {
          $pull: { groupAPIDenines: id },
        },
      );

      pullPromises.push(
        pullGroupAPIAccessesInGroup,
        pullGroupAPIDeniesInGroup,
        pullGroupAPIAccessesInUser,
        pullGroupAPIDeniesInUser,
      );
    }

    const groupApisDeletedPromise = this.groupApiService.deleteManyHardByIds(
      ids.split(','),
    );

    return Promise.all([...pullPromises, groupApisDeletedPromise]);
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
    const pullPromises: any[] = [];

    // Pull all groupApi in groupAPIAccesses from groups
    const pullGroupAPIAccessesInGroup = this.groupService.updateManyBy(
      { groupAPIAccesses: id },
      {
        $pull: { groupAPIAccesses: id },
      },
    );

    // Pull all groupApi in groupAPIDenines from groups
    const pullGroupAPIDeniesInGroup = this.groupService.updateManyBy(
      { groupAPIDenines: id },
      {
        $pull: { groupAPIDenines: id },
      },
    );

    // Pull all groupApi in groupAPIAccesses from user
    const pullGroupAPIAccessesInUser = this.userService.updateManyBy(
      { groupAPIAccesses: id },
      {
        $pull: { groupAPIAccesses: id },
      },
    );

    // Pull all groupApi in groupAPIAccesses from user
    const pullGroupAPIDeniesInUser = this.userService.updateManyBy(
      { groupAPIDenines: id },
      {
        $pull: { groupAPIDenines: id },
      },
    );

    pullPromises.push(
      pullGroupAPIAccessesInGroup,
      pullGroupAPIDeniesInGroup,
      pullGroupAPIAccessesInUser,
      pullGroupAPIDeniesInUser,
    );

    const groupApiDeletedPromise = this.groupApiService.deleteOneHardById(id);

    return Promise.all([...pullPromises, groupApiDeletedPromise]);
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    const result = await this.groupApiService.paginate(query);
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
    const result = await this.groupApiService.findOneById(id, {
      populate,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
