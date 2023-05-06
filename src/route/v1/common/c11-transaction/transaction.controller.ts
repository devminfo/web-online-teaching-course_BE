import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import { ObjectId } from 'mongodb';
import { TransactionStatusEnum } from '@enum/3.transaction-status.enum';
import CreateTransactionDto from './dto/create-transaction.dto';
import UpdateTransactionDto from './dto/update-transaction.dto';
import TransactionService from './transaction.service';

@ApiTags('Transactions')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.transactionService.findManyBy(query);
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
  async create(@Body() body: CreateTransactionDto): Promise<any> {
    const result = await this.transactionService.create(body);

    return result;
  }

  /**
   * confirm transaction
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id/confirm')
  @HttpCode(200)
  async confirmTransaction(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() body: UpdateTransactionDto,
  ): Promise<any> {
    return this.transactionService.confirm(id, body);
  }

  @Post('upgrade-to-teacher')
  @HttpCode(200)
  async updateToTeacherTransaction(
    @Body() body: UpdateTransactionDto,
  ): Promise<any> {
    return this.transactionService.upgradeToTeacher(body);
  }

  @Post('buy-course')
  @HttpCode(200)
  async buyCourse(@Body() body: UpdateTransactionDto): Promise<any> {
    return this.transactionService.buyCourse(body);
  }

  @Post('join-class')
  @HttpCode(200)
  async joinClass(@Body() body: UpdateTransactionDto): Promise<any> {
    return this.transactionService.joinClass(body);
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
    @Body() body: UpdateTransactionDto,
  ): Promise<any> {
    const result = await this.transactionService.updateOneById(id, body);

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
    const result = await this.transactionService.deleteManyHardByIds(
      ids.split(','),
    );
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
    const result = await this.transactionService.deleteOneHardById(id);

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
    return this.transactionService.paginate(query);
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
    const result = await this.transactionService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
