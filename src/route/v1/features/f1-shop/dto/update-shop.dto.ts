import { PartialType } from '@nestjs/mapped-types';

import CreateShopDto from './create-shop.dto';

export default class UpdateShopDto extends PartialType(CreateShopDto) {}
