import { PartialType } from '@nestjs/mapped-types';

import CreateAuthUserIdDto from './create-auth-user-id.dto';

export default class UpdateAuthUserIdDto extends PartialType(
  CreateAuthUserIdDto,
) {}
