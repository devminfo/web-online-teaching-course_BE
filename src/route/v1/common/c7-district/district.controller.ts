import { Types } from 'mongoose';

import UpdateDistrictDto from '@common/c7-district/dto/update-district.dto';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import DistrictService from './district.service';
import CreateDistrictDto from './dto/create-district.dto';

@ApiTags('District')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.districtService.findManyBy(query);
    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateDistrictDto): Promise<any> {
    const result = await this.districtService.create(body);

    return result;
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
    @Body() body: UpdateDistrictDto,
  ): Promise<any> {
    const result = await this.districtService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(
    @Param('ids') ids: string,
  ): Promise<any> {
    const result = await this.districtService.deleteManyHardByIds(ids.split(','));
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
    const result = await this.districtService.deleteOneHardById(id);

    return result;
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: any): Promise<any> {
    const result = await this.districtService.paginate(query);

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
  ): Promise<any> {
    const result = await this.districtService.findOneById(id);

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
