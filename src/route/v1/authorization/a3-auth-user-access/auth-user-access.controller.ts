import { Request } from 'express';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { routerHelper } from '@helper/router.helper';
import { sortAndUniqueMethods } from '@helper/sort-methods';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req,
  UseInterceptors,
} from '@nestjs/common';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import AuthUserAccessService from './auth-user-access.service';
import CreateAuthUserAccessDto from './dto/create-auth-user-access.dto';
import UpdateAuthUserAccessDto from './dto/update-auth-user-access.dto';

@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AuthUserAccessController {
  constructor(private readonly authUserAccessService: AuthUserAccessService) {}

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

    const result = await this.authUserAccessService.findManyBy(filter, options);

    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateAuthUserAccessDto): Promise<any> {
    const item = {
      ...body,
      accessMethods: sortAndUniqueMethods(body.accessMethods),
      url: routerHelper.updateValidUrl(body.url),
      collectionName: routerHelper.getCollectionNameByUrl(body.url),
    };

    // find authUserAccess
    const result = await this.authUserAccessService.findOneBy({
      // accessMethods: item.accessMethods,
      url: item.url,
    });

    if (result) {
      const methods = [...(body?.accessMethods || []), ...result.accessMethods];

      const accessMethods = sortAndUniqueMethods(methods);

      return this.authUserAccessService.updateOneById(result._id, {
        ...body,
        accessMethods,
      });
    }

    // create
    return this.authUserAccessService.create(item);
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
    @Body() body: UpdateAuthUserAccessDto,
  ): Promise<any> {
    const result = await this.authUserAccessService.updateOneById(id, body);
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
    const result = await this.authUserAccessService.deleteManyHardByIds(
      ids.split(','),
    );
    return result;
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
    const result = await this.authUserAccessService.deleteOneHardById(id);
    return result;
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    const result = await this.authUserAccessService.paginate(query);
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
    const result = await this.authUserAccessService.findOneById(id, {
      populate,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
