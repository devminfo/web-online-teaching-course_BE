import ProvinceModule from '@common/c6-province/province.module';
import DistrictModule from '@common/c7-district/district.module';
import VillageModule from '@common/c8-village/village.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [ProvinceModule, DistrictModule, VillageModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
