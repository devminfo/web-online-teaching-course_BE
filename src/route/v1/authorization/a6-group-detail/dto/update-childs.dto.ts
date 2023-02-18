import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

import CreateGroupDetailDto from './create-group-detail.dto';

export default class UpdateChildsDto extends PartialType(
  CreateGroupDetailDto,
) {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  childs?: string[];
}
