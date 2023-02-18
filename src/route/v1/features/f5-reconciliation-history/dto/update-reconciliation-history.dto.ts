import { PartialType } from '@nestjs/mapped-types';

import CreateReconciliationHistoryDto from './create-reconciliation-history.dto';

export default class UpdateReconciliationHistoryDto extends PartialType(
  CreateReconciliationHistoryDto,
) {}
