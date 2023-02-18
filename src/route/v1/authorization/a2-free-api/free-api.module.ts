import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import FreeApiController from './free-api.controller';
import FreeApiRepository from './free-api.repository';
import FreeApiService from './free-api.service';
import { FreeApi, FreeApiSchema } from './schemas/free-api.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FreeApi.name,
        schema: FreeApiSchema,
      },
    ]),
  ],
  controllers: [FreeApiController],
  providers: [FreeApiService, FreeApiRepository],
  exports: [FreeApiService, FreeApiRepository],
})
export default class FreeApiModule {}
