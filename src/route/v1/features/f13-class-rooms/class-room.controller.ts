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

import ClassRoomService from './class-room.service';
import CreateClassRoomDto from './dto/create-class-room.dto';
import UpdateClassRoomDto from './dto/update-class-room.dto';
import ConversationService from '@features/f9-conversations/conversation.service';
import UserService from '@authorization/a1-user/user.service';

@ApiTags('ClassRooms')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class ClassRoomController {
  constructor(
    private readonly classRoomService: ClassRoomService,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.classRoomService.findManyBy(query);
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
  async create(@Body() body: CreateClassRoomDto): Promise<any> {
    const classRoom = await this.classRoomService.create(body);

    await Promise.all([
      this.conversationService.create({
        idClassRoom: classRoom._id,
        users: [...classRoom.members, classRoom.teacher],
        chatName: classRoom.name,
        isGroup: true,
        avatar: classRoom.thumbnail,
        createdBy: classRoom.teacher,
      }),
      this.userService.updateOneById(body.teacher, {
        $addToSet: { myClassRooms: classRoom._id },
      }),
    ]);
    return classRoom;
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
    @Body() body: UpdateClassRoomDto,
  ): Promise<any> {
    const result = await this.classRoomService.updateOneById(id, body);

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
    const result = await this.classRoomService.deleteManyHardByIds(
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
    const result = await this.classRoomService.deleteOneHardById(id);

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
    return this.classRoomService.paginate(query);
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
    const result = await this.classRoomService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
