import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import BannerService from './banner.service';
import CreateBannerDto from './dto/create-banner.dto';
import UpdateBannerDto from './dto/update-banner.dto';

@ApiTags('Banners')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.bannerService.findManyBy(query);
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateBannerDto): Promise<any> {
    const result = await this.bannerService.create(body);

    return result;
  }

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateBannerDto,
  ): Promise<any> {
    const result = await this.bannerService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.bannerService.deleteManyHardByIds(ids.split(','));
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.bannerService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.bannerService.paginate(query);
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.bannerService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
