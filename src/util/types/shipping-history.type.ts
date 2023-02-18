import { OrderStatusEnum } from '@enum/10.order-status-method.enum';

export type ShippingHistoryType = {
  title: string;
  note: string;
  status: OrderStatusEnum;
  createdAt: number;
};
