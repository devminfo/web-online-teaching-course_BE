import { PartialType } from '@nestjs/mapped-types';

import CreatePostDto from './create-post.dto';

export default class UpdatePostDto extends PartialType(CreatePostDto) {}
