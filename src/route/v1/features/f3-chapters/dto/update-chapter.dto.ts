import { PartialType } from '@nestjs/mapped-types';

import CreateChapterDto from './create-chapter.dto';

export default class UpdateChapterDto extends PartialType(CreateChapterDto) {}
