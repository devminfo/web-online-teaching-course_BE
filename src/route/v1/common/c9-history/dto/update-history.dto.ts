import { PartialType } from '@nestjs/mapped-types';

import CreatehistoryDto from './create-history.dto';

export default class UpdatehistoryDto extends PartialType(CreatehistoryDto) {}
