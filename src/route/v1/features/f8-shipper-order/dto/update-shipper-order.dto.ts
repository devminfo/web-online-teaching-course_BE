import { PartialType } from '@nestjs/mapped-types';
import CreateShipperOrderDto from './create-shipper-order.dto';

export default class UpdateShipperOrderDto extends PartialType(
  CreateShipperOrderDto,
) {}
