import { PartialType } from '@nestjs/mapped-types';

import CreateBannerDto from './create-banner.dto';

export default class UpdateBannerDto extends PartialType(CreateBannerDto) {}
