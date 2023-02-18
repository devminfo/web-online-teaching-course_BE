import { PartialType } from '@nestjs/mapped-types';

import CreateCommentDto from './create-comment.dto';

export default class UpdateCommentDto extends PartialType(CreateCommentDto) {}
