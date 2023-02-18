import { PartialType } from '@nestjs/mapped-types';

import CreateGroupDto from './create-group.dto';

export default class UpdateGroupDto extends PartialType(CreateGroupDto) {}
