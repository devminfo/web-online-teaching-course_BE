import { PartialType } from '@nestjs/mapped-types';

import CreateOrderDto from './create-order.dto';

export default class UpdateOrderDto extends PartialType(CreateOrderDto) {}
