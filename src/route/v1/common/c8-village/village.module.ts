import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Village, VillageSchema } from './schemas/village.schema';
import VillageController from './village.controller';
import VillageRepository from './village.repository';
import VillageService from './village.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Village.name,
      schema: VillageSchema,
    }]),
  ],
  controllers: [VillageController],
  providers: [VillageService, VillageRepository],
  exports: [VillageService, VillageRepository],
})
export default class VillageModule {}
