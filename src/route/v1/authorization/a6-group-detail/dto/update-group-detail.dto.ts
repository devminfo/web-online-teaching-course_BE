import { PartialType } from '@nestjs/mapped-types';

import CreateGroupDetailDto from './create-group-detail.dto';

export default class UpdateGroupDetailDto extends PartialType(
  CreateGroupDetailDto,
) {}
