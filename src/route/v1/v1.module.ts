import { RouterModule, Routes } from 'nest-router';

import FreeApiModule from '@authorization/a2-free-api/free-api.module';
import AuthUserAccessModule from '@authorization/a3-auth-user-access/auth-user-access.module';
import AuthUserIdModule from '@authorization/a4-auth-user-id/auth-user-id.module';
import GroupModule from '@authorization/a5-group/group.module';
import GroupDetailModule from '@authorization/a6-group-detail/group-detail.module';
import GroupApiModule from '@authorization/a7-group-api/group-api.module';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import DashboardModule from '@common/c10-dashboard/dashboard.module';
import TransactionModule from '@common/c11-transaction/transaction.module';
import NotificationModule from '@common/c12-notification/notification.module';
import SettingModule from '@common/c13-setting/setting.module';
import OtpModule from '@common/c2-otp/otp.module';
import HistoryModule from '@common/c9-history/history.module';

import RolesGuard from '@guard/roles.guard';
import { ShareFunction } from '@helper/static-function';
import { Module } from '@nestjs/common';

import ShopModule from '@features/f1-shop/shop.module';
import OrderModule from '@features/f2-order/order.module';
import UserBankModule from '@features/f3-user-bank/user-bank.module';
import AddressHistoryModule from '@features/f4-address-history/address-history.module';
import ReconciliationHistoryModule from '@features/f5-reconciliation-history/reconciliation-history.module';
import RequestChatModule from '@features/f6-request-chat/request-chat.module';
import ReviewModule from '@features/f7-review/review.module';
import ShipperOrderModule from '@features/f8-shipper-order/shipper-order.module';
import UserModule from './authorization/a1-user/user.module';
import AuthModule from './common/c1-auth/auth.module';
import UploadModule from './common/c3-upload/upload.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import ProvinceModule from './common/c6-province/province.module';
import DistrictModule from './common/c7-district/district.module';
import VillageModule from './common/c8-village/village.module';
import UserTestModule from '@features/f4-user-test/user-test.module';
// import { SeedModule } from '@common/c14-seed/seed.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      // Authorizations
      { path: '/users', module: UserModule },
      { path: '/free-apis', module: FreeApiModule },
      { path: '/auth-user-accesses', module: AuthUserAccessModule },
      { path: '/auth-user-ids', module: AuthUserIdModule },
      { path: '/groups', module: GroupModule },
      { path: '/group-details', module: GroupDetailModule },
      { path: '/group-apis', module: GroupApiModule },

      // Seed
      // { path: '/seeds', module: SeedModule },

      // Commons
      { path: '/backup-datas', module: BackupDataModule },
      { path: '/auth', module: AuthModule },
      { path: '/otps', module: OtpModule },
      { path: '/uploads', module: UploadModule },
      { path: '/file-manager', module: FileManagerModule },
      { path: '/provinces', module: ProvinceModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/histories', module: HistoryModule },
      { path: '/dashboards', module: DashboardModule },
      { path: '/transactions', module: TransactionModule },
      { path: '/notifications', module: NotificationModule },
      { path: '/settings', module: SettingModule },

      // Features
      { path: '/shops', module: ShopModule },
      { path: '/orders', module: OrderModule },
      { path: '/user-banks', module: UserBankModule },
      { path: '/address-history', module: AddressHistoryModule },
      { path: '/reconciliation-history', module: ReconciliationHistoryModule },
      { path: '/request-chats', module: RequestChatModule },
      { path: '/reviews', module: ReviewModule },
      { path: '/shipper-orders', module: ShipperOrderModule },
      { path: '/user-tests', module: UserTestModule },
    ],
  },
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Replace serve static via router static with s3 storage ***');
  routes.push({ path: '/static', module: StaticS3Module });
}
const imports = [
  RouterModule.forRoutes(routes),

  // authorization
  UserModule,
  FreeApiModule,
  AuthUserAccessModule,
  AuthUserIdModule,
  GroupModule,
  GroupDetailModule,
  GroupApiModule,
  RolesGuard,

  // Seed
  // SeedModule,

  // common
  BackupDataModule,
  AuthModule,
  OtpModule,
  UploadModule,
  FileManagerModule,
  ProvinceModule,
  DistrictModule,
  VillageModule,
  HistoryModule,
  DashboardModule,

  // features
  ShopModule,
  OrderModule,
  UserBankModule,
  AddressHistoryModule,
  ReconciliationHistoryModule,
  RequestChatModule,
  ReviewModule,
  ShipperOrderModule,
  UserTestModule,
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Import module S3Storage dynamic ***');
  imports.push(StaticS3Module);
}

@Module({
  imports,
})
export default class V1Module {}
