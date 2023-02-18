import ProvinceService from '@common/c6-province/province.service';
import DistrictService from '@common/c7-district/district.service';
import VillageService from '@common/c8-village/village.service';
import { fileHelper } from '@helper/file.helper';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class SeedService {
  constructor(
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private villageService: VillageService,
    private logger: CustomLoggerService,
  ) {}

  /**
   * Seed data for provinces, district, ward
   *
   * @returns
   */
  async seedProvincesDistrictsWards() {
    const jsonPath = join(
      __dirname,
      '../../../../util/json-seed/provinces-districts-wards.json',
    );
    const isFileExist = fileHelper.isFileExist(jsonPath);

    const counter = {
      totalProvince: 0,
      totalDistrict: 0,
      totalWard: 0,
    };

    //  check file exist
    if (!isFileExist) {
      this.logger.error(
        SeedService.name,
        `${jsonPath} was not found, cannot seed provinces`,
      );
    }

    //  Read data file
    const dataString = fileHelper.readFileSync(jsonPath).toString().trim();

    // Convert data string to JSON
    const { data } = JSON.parse(dataString);

    // Delete all provinces,district, wards
    await Promise.all([
      this.provinceService.deleteMany({}),
      this.districtService.deleteMany({}),
      this.villageService.deleteMany({}),
    ]);

    // Get province in data
    // eslint-disable-next-line no-restricted-syntax
    for await (const province of data) {
      const provinceItem = {
        name: province.name,
        type: province.type,
      };

      // Save province
      const provinceSaved = await this.provinceService.create(provinceItem);
      counter.totalProvince += 1;

      // Get idProvince
      const idProvince = provinceSaved._id;

      // Get province in data
      // eslint-disable-next-line no-restricted-syntax
      for await (const district of province.districts) {
        const districtItem = {
          idProvince,
          name: district.name,
          type: district.type,
        };

        // Save district
        const districtSaved = await this.districtService.create(districtItem);
        counter.totalDistrict += 1;

        // Get idDistrict
        const idDistrict = districtSaved._id;

        // Store wards of districts
        const wardSavedPromises = district.wards.map((ward: any) => {
          const wardItem = {
            idProvince,
            idDistrict,
            name: ward.name,
            type: ward.type,
          };

          counter.totalWard += 1;
          return this.villageService.create(wardItem);
        });

        // Save wards
        await Promise.all(wardSavedPromises);
      }
    }

    this.logger.log(
      'Seed data for all provinces, districts, wards successfully!',
      {
        ...counter,
      },
    );

    return { ...counter };
  }
}
