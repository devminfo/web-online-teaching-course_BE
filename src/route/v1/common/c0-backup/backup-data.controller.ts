import fs from 'fs';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import BackupDataService from './backup-data.service';

@ApiTags('BackupData')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class BackupDataController {
  constructor(private readonly backupDataService: BackupDataService) { }

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any) {
    const result = await this.backupDataService.findManyBy(query);
    return result;
  }

  /**
   * Restore Master
   */
  @Post('/restore/master')
  @HttpCode(201)
  async restoreMaster() {
    return this.backupDataService.restoreMaster();
  }

  /**
   * Restore backup
   */
    @Post('/:id/restore')
    @HttpCode(201)
  async restore(@Param('id') id: Types.ObjectId) {
    return this.backupDataService.restore(id);
  }

  /**
   * Create backup
   */
  @Post('/')
  @HttpCode(201)
    async create() {
      return this.backupDataService.backup();
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
    const result = await this.backupDataService.deleteManyHardByIds(ids.split(','));
    return result;
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const result = await this.backupDataService.deleteOneHardById(id);
    fs.unlink(result.path, (err) => { });
    return result;
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: any) {
    const result = await this.backupDataService.paginate(query);
    return result;
  }

  /**
   * findOneById
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const result = await this.backupDataService.findOneById(id);

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
