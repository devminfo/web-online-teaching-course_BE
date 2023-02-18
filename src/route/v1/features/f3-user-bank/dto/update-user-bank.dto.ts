import { PartialType } from '@nestjs/mapped-types';

import CreateUserBankDto from './create-user-bank.dto';

export default class UpdateUserBankDto extends PartialType(CreateUserBankDto) {}
