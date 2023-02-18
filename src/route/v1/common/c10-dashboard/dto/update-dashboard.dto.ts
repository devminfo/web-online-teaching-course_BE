import { PartialType } from '@nestjs/mapped-types';

import CreateDashboardDto from './create-dashboard.dto';

export default class UpdateDashboardDto extends PartialType(
  CreateDashboardDto,
) {}
