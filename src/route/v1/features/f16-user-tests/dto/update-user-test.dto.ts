import { PartialType } from '@nestjs/mapped-types';

import CreateUserTestDto from './create-user-test.dto';

export default class UpdateUserTestDto extends PartialType(CreateUserTestDto) {}
