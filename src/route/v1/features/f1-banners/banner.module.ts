import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Banner, BannerSchema } from './schemas/banner.schema';
import BannerController from './banner.controller';
import BannerRepository from './banner.repository';
import BannerService from './banner.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Banner.name,
        schema: BannerSchema,
      },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository],
  exports: [BannerService, BannerRepository],
})
export default class BannerModule {}
