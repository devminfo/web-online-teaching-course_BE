import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShipperOrder,
  ShipperOrderSchema,
} from './schemas/shipper-order.schema';
import ShipperOrderController from './shipper-order.controller';
import ShipperOrderRepository from './shipper-order.repository';
import ShipperOrderService from './shipper-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShipperOrder.name,
        schema: ShipperOrderSchema,
      },
    ]),
  ],
  controllers: [ShipperOrderController],
  providers: [ShipperOrderService, ShipperOrderRepository],
  exports: [ShipperOrderService, ShipperOrderRepository],
})
export default class ShipperOrderModule {}
