import { PartialType } from '@nestjs/mapped-types';

import CreateClassRoomDto from './create-class-room.dto';

export default class UpdateClassRoomDto extends PartialType(
  CreateClassRoomDto,
) {}
