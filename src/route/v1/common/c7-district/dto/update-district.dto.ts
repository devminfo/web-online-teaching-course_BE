import { PartialType } from '@nestjs/mapped-types';

import CreateDistrictDto from './create-district.dto';

export default class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}
