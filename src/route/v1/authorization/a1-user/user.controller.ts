import { Request as ExpressRequest, Router } from 'express';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import { GetCurrentUserId } from '@decorator/get-current-user-id.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import { UserFcmMessageInterface } from '@lazy-module/fcm/interfaces/user-fcm-message.interface';
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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import CreateUserDto from './dto/create-user.dto';
import { UpdatePasswordByEmailDto } from './dto/update-password-by-email.dto';
import { UpdatePasswordByPhoneDto } from './dto/update-password-by-phone.dto';
import { UpdatePassword } from './dto/update-password.dto';
import { updateRolesDto } from './dto/update-roles.dto';
import UpdateUserDto from './dto/update-user.dto';
import FcmUserService from './fcm/fcm-user.service';
import UserService from './user.service';

@ApiTags('User')
@Controller()
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fcmUserService: FcmUserService,
  ) {}

  /**
   * Update roles of user by id
   * @param id
   * @param body
   * @returns
   */
  @Put(':id/roles')
  @HttpCode(200)
  async updateRoles(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: updateRolesDto,
  ) {
    return this.userService.updateRolesById(id, body);
  }

  /**
   * Update password
   * @param userId
   * @param data
   * @returns
   */
  @Put('update-password')
  @HttpCode(200)
  async updatePassword(
    @GetCurrentUserId() userId: Types.ObjectId,
    @Body() data: UpdatePassword,
  ): Promise<any> {
    return this.userService.updatePasswordById(userId, data);
  }

  /**
   * Update password
   * @param body
   * @returns
   */
  @Put('update-password/phone')
  @HttpCode(200)
  async updatePasswordByPhone(
    @Body() body: UpdatePasswordByPhoneDto,
  ): Promise<any> {
    return this.userService.updatePasswordByPhone(body);
  }

  /**
   * Update password
   * @param body
   * @returns
   */
  @Put('update-password/email')
  @HttpCode(200)
  async updatePasswordByEmail(
    @Body() body: UpdatePasswordByEmailDto,
  ): Promise<any> {
    return this.userService.updatePasswordByEmail(body);
  }

  /**
   * Fcm push
   * @param userId
   * @param message
   * @returns
   */
  @Put(':id/fcm-push')
  @HttpCode(200)
  async push(
    // @Request() req: ExpressRequest,
    @Param('id') userId: Types.ObjectId,
    @Body() message: UserFcmMessageInterface,
  ): Promise<any> {
    await this.fcmUserService.pushFCMToUsers([userId], message);
    // await this.userService.pushFCMToTopic('topics/demo', message);
    return {};
  }

  /**
   * Add deviceId
   * @param userId
   * @param deviceID
   * @returns
   */
  @Put(':id/add-deviceID')
  @HttpCode(200)
  async addDeviceID(
    @GetCurrentUserId() userId: Types.ObjectId,
    @Body('deviceID') deviceID: string,
  ): Promise<any> {
    const result = await this.userService.addDeviceID(userId, deviceID);

    return result;
  }

  /**
   * findAll
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@ApiQueryParams() query: any): Promise<any> {
    const { filter, population, projection } = query;

    const result = await this.userService.findManyBy(filter, {
      populate: population,
      projection,
    });

    return result;
  }

  /**
   * create
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateUserDto): Promise<any> {
    const result = await this.userService.create(body);
    return result;
  }

  /**
   * enable FCM
   */
  @Put(':id/enable-fcm')
  @HttpCode(200)
  async enableFCM(
    @Param('id') id: Types.ObjectId,
    @Body('isEnableFCM') isEnableFCM: boolean = true,
  ) {
    return this.userService.updateOneById(id, { isEnableFCM });
  }

  /**
   * update
   * @param id
   * @param body
   * @returns
   */
  @Put('/update-me')
  @HttpCode(200)
  async update(
    @GetCurrentUserId() id: Types.ObjectId,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userService.updateOneById(id, body);
    return user;
  }

  /**
   * update
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async updateById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userService.updateOneById(id, body);
    return user;
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id/hard')
  // @HttpCode(204)
  async deleteHard(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.userService.deleteOneHardById(id);
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.userService.deleteManyByIds(ids.split(','));
    return result;
  }

  /**
   * Delete hard many by ids
   * @param ids
   * @returns
   */
  @Delete(':ids/hard-ids')
  // @HttpCode(204)
  async deleteManyHardByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.userService.deleteManyHardByIds(ids.split(','));
    return result;
  }

  /**
   * Delete
   * @param id
   * @returns
   */
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.userService.deleteOneById(id);
  }

  /**
   * paginate
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: any): Promise<any> {
    const result = await this.userService.paginate(query);
    return result;
  }

  /**
   * Get current userlogged in
   * @param id
   * @returns
   */
  @Get('me')
  @HttpCode(200)
  async me(
    @GetCurrentUserId() id: Types.ObjectId,
    @ApiQueryParams() { population, projection }: AqpDto,
  ): Promise<any> {
    const result = await this.userService.findOneById(id, {
      populate: population,
      projection,
    });

    if (!result) throw new NotFoundException('User not found.');

    return result;
  }

  /**
   * Reset authorization
   *
   * @returns
   */
  @HttpCode(200)
  @Get('reset-authorization')
  resetAuthorization(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    return this.userService.resetAuthorization(router);
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
    @ApiQueryParams() { population }: AqpDto,
  ): Promise<null> {
    const result: any = await this.userService.findOneById(id, {
      populate: population,
    });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
