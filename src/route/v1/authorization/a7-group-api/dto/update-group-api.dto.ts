import { PartialType } from '@nestjs/mapped-types';

import CreateGroupApiDto from './create-group-api.dto';

export default class UpdateGroupApiDto extends PartialType(CreateGroupApiDto) {}
