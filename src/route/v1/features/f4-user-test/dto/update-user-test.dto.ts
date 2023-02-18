import { PartialType } from '@nestjs/mapped-types';

import CreateUserTDto from './create-user-test.dto';

export default class UpdateUserTDto extends PartialType(CreateUserTDto) {}
