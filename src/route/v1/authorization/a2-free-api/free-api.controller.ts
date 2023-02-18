import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { routerHelper } from '@helper/router.helper';
import { sortAndUniqueMethods } from '@helper/sort-methods';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import CreateFreeApiDto from './dto/create-free-api.dto';
import UpdateFreeApiDto from './dto/update-free-api.dto';
import FreeApiService from './free-api.service';

@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class FreeApiController {
  constructor(private readonly freeApiService: FreeApiService) {}

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

    const result = await this.freeApiService.findManyBy(filter, options);

    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateFreeApiDto): Promise<any> {
    const item = {
      ...body,
      accessMethods: sortAndUniqueMethods(body.accessMethods),
      url: routerHelper.updateValidUrl(body.url),
      collectionName: routerHelper.getCollectionNameByUrl(body.url),
    };

    // find freeApi
    const result = await this.freeApiService.findOneBy({
      url: item.url,
    });

    // update free apis
    if (result) {
      const methods = [...(body?.accessMethods || []), ...result.accessMethods];

      const accessMethods = sortAndUniqueMethods(methods);

      return this.freeApiService.updateOneById(result._id, {
        ...body,
        accessMethods,
      });
    }

    // create
    return this.freeApiService.create(item);
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
    @Body() body: UpdateFreeApiDto,
  ): Promise<any> {
    const result = await this.freeApiService.updateOneById(id, body);
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
    const result = await this.freeApiService.deleteManyHardByIds(
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
    const result = await this.freeApiService.deleteOneHardById(id);
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
    const result = await this.freeApiService.paginate(query);
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
    const result = await this.freeApiService.findOneById(id, {
      populate,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
