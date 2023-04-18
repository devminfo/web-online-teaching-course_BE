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

import BannerModule from '@features/f1-banners/banner.module';
import CourseModule from '@features/f2-courses/course.module';
import ChapterModule from '@features/f3-chapters/chapter.module';
import LearningPathModule from '@features/f5-learning-paths/learning-path.module';
import PostModule from '@features/f7-posts/post.module';
import CommentModule from '@features/f8-comments/comment.module';
import ConversationModule from '@features/f9-conversations/conversation.module';
import MessageModule from '@features/f10-messages/message.module';
import QuizModule from '@features/f11-quizzes/quiz.module';
import PlayQuizModule from '@features/f12-play-quizzes/play-quiz.module';
import ClassRoomModule from '@features/f13-class-rooms/class-room.module';
import QuestionModule from '@features/f14-questions/question.module';
import TestQuestionModule from '@features/f15-test-questions/test-question.module';
import UserTestModule from '@features/f16-user-tests/user-test.module';
import LectureModule from '@features/f4-lectures/lecture.module';
import VillageModule from './common/c8-village/village.module';
import DistrictModule from './common/c7-district/district.module';
import ProvinceModule from './common/c6-province/province.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';
import UploadModule from './common/c3-upload/upload.module';
import AuthModule from './common/c1-auth/auth.module';
import UserModule from './authorization/a1-user/user.module';

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
      {
        path: 'banners',
        module: BannerModule,
      },
      {
        path: 'courses',
        module: CourseModule,
      },
      {
        path: 'chapters',
        module: ChapterModule,
      },
      {
        path: 'lectures',
        module: LectureModule,
      },
      {
        path: 'learning-paths',
        module: LearningPathModule,
      },
      {
        path: 'posts',
        module: PostModule,
      },
      {
        path: 'comments',
        module: CommentModule,
      },
      {
        path: 'conversations',
        module: ConversationModule,
      },
      {
        path: 'messages',
        module: MessageModule,
      },
      {
        path: 'quizzes',
        module: QuizModule,
      },
      {
        path: 'play-quizzes',
        module: PlayQuizModule,
      },
      {
        path: 'class-rooms',
        module: ClassRoomModule,
      },
      {
        path: 'questions',
        module: QuestionModule,
      },
      {
        path: 'test-questions',
        module: TestQuestionModule,
      },
      {
        path: 'user-tests',
        module: UserTestModule,
      },
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
  SettingModule,
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
  TransactionModule,

  // features
  BannerModule,
  CourseModule,
  ChapterModule,
  LectureModule,
  LearningPathModule,
  PostModule,
  CommentModule,
  ConversationModule,
  MessageModule,
  QuizModule,
  PlayQuizModule,
  ClassRoomModule,
  QuestionModule,
  TestQuestionModule,
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
