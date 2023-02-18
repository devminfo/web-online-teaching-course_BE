// // eslint-disable-next-line import/no-extraneous-dependencies
// import { seeder } from 'nestjs-seeder';

// import {
//   Province,
//   ProvinceSchema,
// } from '@common/c6-province/schemas/province.schema';
// import {
//   District,
//   DistrictSchema,
// } from '@common/c7-district/schemas/district.schema';
// import {
//   Village,
//   VillageSchema,
// } from '@common/c8-village/schemas/village.schema';
// import { MongooseModule } from '@nestjs/mongoose';

// require('dotenv').config();

// seeder({
//   imports: [
//     MongooseModule.forRoot(process.env.MONGODB_URL as string, {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     }),
//     MongooseModule.forFeature([
//       { name: Province.name, schema: ProvinceSchema },
//       { name: District.name, schema: DistrictSchema },
//       { name: Village.name, schema: VillageSchema },
//     ]),
//   ],
// });
