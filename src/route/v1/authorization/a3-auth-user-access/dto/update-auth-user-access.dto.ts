import { PartialType } from '@nestjs/mapped-types';

import CreateAuthUserAccessDto from './create-auth-user-access.dto';

export default class UpdateAuthUserAccessDto extends PartialType(
  CreateAuthUserAccessDto,
) {}
