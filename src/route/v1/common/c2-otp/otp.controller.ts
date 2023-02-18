import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import {
  SendOtpByEmailDto, SendOtpByPhoneDto, VerifyOtpEmailDto, VerifyOtpPhoneDto
} from './dto';
import OtpService from './otp.service';

@ApiTags('Otp')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class OtpController {
  constructor(private readonly otpService: OtpService) { }

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any) {
    const result = await this.otpService.findManyBy(query);
    return result;
  }

  /**
   * Send otp by phone
   * @param body: SendOtpByPhoneDto
   * @returns
   */
  @Post('send-otp-phone')
  @HttpCode(201)
  async sendOtpByPhone(@Body() body: SendOtpByPhoneDto) {
    const result = await this.otpService.sendOtpByPhone(body);
    return result;
  }

  /**
   * send otp by email
   * @param body: SendOtpByEmailDto
   * @returns
   */
  @Post('send-otp-email')
  @HttpCode(201)
  async sendOtpByEmail(@Body() body: SendOtpByEmailDto) {
    const result = await this.otpService.sendOtpEmail(body);
    return result;
  }

  /**
   * Verify Otp Phone
   * @param body: VerifyOtpPhoneDto
   * @returns: Boolean
   */
  @Put('verify-otp-phone')
  @HttpCode(200)
  async verifyOtpPhone(@Body() body: VerifyOtpPhoneDto) {
    const result = await this.otpService.verifyOtpPhone(body);
    return result;
  }

  /**
   * veirfy otp email
   * @param body
   * @returns
   */
  @Put('verify-otp-email')
  @HttpCode(200)
  async verifyOtpEmail(@Body() body: VerifyOtpEmailDto) {
    const result = await this.otpService.verifyOtpEmail(body);
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
    const result = await this.otpService.deleteManyHardByIds(ids.split(','));
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
    const result = await this.otpService.deleteOneHardById(id);
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
    const result = await this.otpService.paginate(query);
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
    const result = await this.otpService.findOneById(id);
    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
