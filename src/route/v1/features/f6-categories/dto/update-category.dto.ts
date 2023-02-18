import { PartialType } from '@nestjs/mapped-types';

import CreateCategoryDto from './create-category.dto';

export default class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
