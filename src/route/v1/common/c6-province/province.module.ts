import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ProvinceController from './province.controller';
import ProvinceRepository from './province.repository';
import ProvinceService from './province.service';
import { Province, ProvinceSchema } from './schemas/province.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Province.name,
      schema: ProvinceSchema,
    }]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
  exports: [ProvinceService, ProvinceRepository],
})
export default class ProvinceModule {}
