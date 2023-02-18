import { PartialType } from '@nestjs/mapped-types';

import CreateAddressHistoryDto from './create-address-history.dto';

export default class UpdateAddressHistoryDto extends PartialType(
  CreateAddressHistoryDto,
) {}
