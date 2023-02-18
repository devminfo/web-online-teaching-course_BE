import { PartialType } from '@nestjs/mapped-types';

import CreateTransactionDto from './create-transaction.dto';

export default class UpdateTransactionDto extends PartialType(
  CreateTransactionDto,
) {}
