import { PartialType } from '@nestjs/mapped-types';

import CreateFreeApiDto from './create-free-api.dto';

export default class UpdateFreeApiDto extends PartialType(CreateFreeApiDto) {}
